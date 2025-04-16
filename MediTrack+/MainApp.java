import java.io.File;
import java.io.FileNotFoundException;
import java.time.LocalDate;
import java.util.*;

public class MainApp {

    private static final Scanner sc = new Scanner(System.in);
    private static final InventoryLinkedList inventory = new InventoryLinkedList();
    private static final ExpiryQueue expiryQueue = new ExpiryQueue();
    private static MedicineBST bst = new MedicineBST();
    private static final SymptomSearch symptomSearch = new SymptomSearch();

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

        System.out.println(" Thank you for using MediTrack+. Stay healthy!");
    }

    private static void showMenu() {
        System.out.println("\n=========  MediTrack+ Pharmacy System =========");
        System.out.println("1.  View Inventory");
        System.out.println("2.  Add New Medicine");
        System.out.println("3.  Remove Medicine by ID");
        System.out.println("4.  Search Medicine by Name (BST)");
        System.out.println("5.  Display Medicines Alphabetically");
        System.out.println("6.  Show Expired Medicines");
        System.out.println("7.   Show Medicines Expiring Soon");
        System.out.println("8.  Get Medicine Suggestions by Symptom");
        System.out.println("9.  Remove Expired Medicines");
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
            case 0 -> {} 
            default -> System.out.println(" Invalid option. Please try again.");
        }
    }

    private static void addNewMedicine() {
        String name = getStringInput("Enter Medicine Name: ");
        String id = getStringInput("Enter ID: ");
        LocalDate expiry = LocalDate.parse(getStringInput("Enter Expiry Date (YYYY-MM-DD): "));
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
            System.out.println(" Found:\n" + found);
        else
            System.out.println(" Medicine not found.");
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
            System.out.println(" No suggestions available for this symptom.");
        } else {
            System.out.println(" Suggested Medicines:");
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
            while (fileScanner.hasNextLine()) {
                String[] data = fileScanner.nextLine().split(",");
                String name = data[0].trim();
                String id = data[1].trim();
                LocalDate expiry = LocalDate.parse(data[2].trim());
                int qty = Integer.parseInt(data[3].trim());
                inventory.addMedicine(new Medicine(name, id, expiry, qty));
            }
            System.out.println(" Sample data loaded.");
        } catch (FileNotFoundException e) {
            System.out.println(" sample_data.txt not found. Starting with empty inventory.");
        }
    }

    private static String getStringInput(String prompt) {
        System.out.print(prompt);
        return sc.nextLine().trim();
    }

    private static int getIntegerInput(String prompt) {
        System.out.print(prompt);
        return Integer.parseInt(sc.nextLine().trim());
    }
}
