import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

public class Medicine implements Comparable<Medicine> {
    private String name;
    private String id;
    private int quantity;
    private LocalDate expiryDate;
    private String[] symptoms;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public Medicine(String name, String id, int quantity, LocalDate expiryDate, String[] symptoms) {
        this.name = name;
        this.id = id;
        this.quantity = quantity;
        this.expiryDate = expiryDate;
        this.symptoms = symptoms;
    }

    public Medicine(String name, String id, LocalDate expiryDate, int quantity) {
        this.name = name;
        this.id = id;
        this.expiryDate = expiryDate;
        this.quantity = quantity;
        this.symptoms = new String[0]; 
    }

    public static Medicine fromCSV(String csvLine) {
        String[] parts = csvLine.split(",");
        if (parts.length < 5) {
            throw new IllegalArgumentException("Invalid CSV format: " + csvLine);
        }

        String name = parts[0].trim();
        String id = parts[1].trim();
        int quantity = Integer.parseInt(parts[2].trim());
        LocalDate expiryDate = LocalDate.parse(parts[3].trim());
        String[] symptoms = parts[4].trim().split(";");
        return new Medicine(name, id, quantity, expiryDate, symptoms);
    }

    public String getName() { return name; }
    public String getId() { return id; }
    public int getQuantity() { return quantity; }
    public LocalDate getExpiryDate() { return expiryDate; }
    public String[] getSymptoms() { return symptoms; }

    public void setQuantity(int quantity) { this.quantity = quantity; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }
    public void setSymptoms(String[] symptoms) { this.symptoms = symptoms; }

    public boolean isExpired() {
        return expiryDate.isBefore(LocalDate.now());
    }

    public void decreaseQuantity(int amount) {
        this.quantity = Math.max(0, this.quantity - amount);
    }

    @Override
    public int compareTo(Medicine other) {
        return this.name.compareToIgnoreCase(other.name);
    }

    @Override
    public String toString() {
        return "Medicine Name : " + name +
               "\nID           : " + id +
               "\nQuantity     : " + quantity +
               "\nExpiry Date  : " + expiryDate.format(formatter) +
               "\nSymptoms     : " + String.join(", ", symptoms);
    }
}
