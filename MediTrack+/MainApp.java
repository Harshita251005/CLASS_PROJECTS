import java.io.File;
import java.io.FileNotFoundException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

public class MainApp {

    private static final Scanner sc = new Scanner(System.in);
    private static final InventoryLinkedList inventory = new InventoryLinkedList();
    private static final ExpiryQueue expiryQueue = new ExpiryQueue();
    private static MedicineBST bst = new MedicineBST();
    private static final SymptomSearch symptomSearch = new SymptomSearch();
    private static List<MedicineBooking> bookings = new ArrayList<>();


    public static void main(String[] args) {
        loadSampleData();

        expiryQueue.loadFromInventory(inventory.getAllMedicines());
        bst.loadFromInventory(inventory.getAllMedicines());

        int choice;
        do {
            showMenu();
            choice = getIntegerInput("Choose an option: ");
            handleChoice(choice);
        } while (choice != 0);

        System.out.println("Thank you for using MediTrack+. Stay healthy!");
    }
    private static void bookMedicine() {
        String medicineName = getStringInput("Enter medicine name to book: ");
        int quantity = getIntegerInput("Enter quantity to book: ");
        
        Medicine medicine = inventory.searchByName(medicineName);
    
        if (medicine != null) {
            if (medicine.getQuantity() >= quantity) {
                String userName = getStringInput("Enter your name: ");
                String contact = getStringInput("Enter your contact: ");
    
                
                medicine.setQuantity(medicine.getQuantity() - quantity);
    
                
                MedicineBooking booking = new MedicineBooking(medicineName, quantity, userName, contact);
                bookings.add(booking);
    
                System.out.println("\nBooking Successful!");
                booking.displayBooking();  
    
                refreshDataStructures(); 
            } else {
                System.out.println("Not enough stock available. Only " + medicine.getQuantity() + " units in stock.");
            }
        } else {
            System.out.println("Medicine not found in inventory.");
        }
    }
    
    private static void displayAllBookings() {
        if (bookings.isEmpty()) {
            System.out.println("No bookings available.");
        } else {
            System.out.println("\n======= All Bookings =======");
            for (MedicineBooking booking : bookings) {
                booking.displayBooking(); 
                System.out.println("----------------------------");
            }
        }
    }
    

    private static void showMenu() {
        System.out.println("\n========= MediTrack+ Pharmacy System =========");
        System.out.println("1.  View Inventory");
        System.out.println("2.  Add New Medicine");
        System.out.println("3.  Remove Medicine by ID");
        System.out.println("4.  Search Medicine by Name (BST)");
        System.out.println("5.  Display Medicines Alphabetically");
        System.out.println("6.  Show Expired Medicines");
        System.out.println("7.  Show Medicines Expiring Soon");
        System.out.println("8.  Get Medicine Suggestions by Symptom");
        System.out.println("9.  Remove Expired Medicines");
        System.out.println("10. Booking Medicine");
        System.out.println("11. View All Bookings");
        System.out.println("0.  Exit");
    }

    private static void handleChoice(int choice) {
        switch (choice) {
            case 1 -> inventory.display();
            case 2 -> addNewMedicine();
            case 3 -> removeMedicine();
            case 4 -> searchMedicineByName();
            case 5 -> bst.displayAlphabetically();
            case 6 -> expiryQueue.showExpiredMedicines();
            case 7 -> showExpiringSoon();
            case 8 -> suggestBySymptom();
            case 9 -> removeExpiredMedicines();
            case 10 -> bookMedicine();
            case 11 -> displayAllBookings();  
            case 0 -> {} // exit
            default -> System.out.println("Invalid option. Please try again.");
        }
    }

    private static void addNewMedicine() {
        String name = getStringInput("Enter Medicine Name: ");
        String id = getStringInput("Enter ID: ");
        
       
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate expiry = null;
        boolean validDate = false;

        while (!validDate) {
            String input = getStringInput("Enter Expiry Date (dd-MM-yyyy): ");
            try {
                expiry = LocalDate.parse(input, formatter);
                validDate = true;
            } catch (DateTimeParseException e) {
                System.out.println(" Invalid date format. Please enter as dd-MM-yyyy (e.g., 03-05-2025).");
            }
        }

        int qty = getIntegerInput("Enter Quantity: ");

        Medicine med = new Medicine(name, id, expiry, qty);
        inventory.addMedicine(med);
        expiryQueue.enqueue(med);
        bst.insert(med);

        System.out.println(" Medicine added successfully.");
    }

    private static void removeMedicine() {
        String id = getStringInput("Enter ID to remove: ");
        inventory.removeById(id);
        refreshDataStructures();
    }

    private static void searchMedicineByName() {
        String name = getStringInput("Enter medicine name to search: ");
        Medicine found = bst.search(name);
        if (found != null)
            System.out.println("Found:\n" + found);
        else
            System.out.println("Medicine not found.");
    }

    private static void showExpiringSoon() {
        int days = getIntegerInput("Enter days threshold (e.g. 30): ");
        expiryQueue.showExpiringSoon(days);
    }

    private static void suggestBySymptom() {
        symptomSearch.showAllSymptoms();
        String symptom = getStringInput("Enter symptom: ");
        List<String> suggestions = symptomSearch.getSuggestions(symptom);

        if (suggestions.isEmpty()) {
            System.out.println("No suggestions available for this symptom.");
        } else {
            System.out.println("Suggested Medicines:");
            suggestions.forEach(med -> System.out.println(" - " + med));
        }
    }

    private static void removeExpiredMedicines() {
        inventory.removeExpired();
        refreshDataStructures();
    }

    private static void refreshDataStructures() {
        expiryQueue.loadFromInventory(inventory.getAllMedicines());
        bst = new MedicineBST();
        bst.loadFromInventory(inventory.getAllMedicines());
    }

    private static void loadSampleData() {
        try (Scanner fileScanner = new Scanner(new File("sample_data.txt"))) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            while (fileScanner.hasNextLine()) {
                String[] data = fileScanner.nextLine().split(",");
                String name = data[0].trim();
                String id = data[1].trim();
                LocalDate expiry = LocalDate.parse(data[2].trim(), formatter);
                int qty = Integer.parseInt(data[3].trim());
                inventory.addMedicine(new Medicine(name, id, expiry, qty));
            }
            System.out.println(" Sample data loaded.");
        } catch (FileNotFoundException e) {
            System.out.println(" sample_data.txt not found. Starting with empty inventory.");
        } catch (DateTimeParseException e) {
            System.out.println(" Date format in sample_data.txt is invalid. Please use dd-MM-yyyy format.");
        }
    }

    private static String getStringInput(String prompt) {
        System.out.print(prompt);
        return sc.nextLine().trim();
    }

    private static int getIntegerInput(String prompt) {
        System.out.print(prompt);
        while (true) {
            try {
                return Integer.parseInt(sc.nextLine().trim());
            } catch (NumberFormatException e) {
                System.out.print(" Invalid number. Please enter a valid integer: ");
            }
        }
    }
   
    
}
