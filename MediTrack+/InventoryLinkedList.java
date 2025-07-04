import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class InventoryLinkedList {

    private static class Node {
        Medicine data;
        Node next;

        Node(Medicine data) {
            this.data = data;
            this.next = null;
        }
    }

    private Node head;

    public void addMedicine(Medicine medicine) {
        Node newNode = new Node(medicine);
        if (head == null) {
            head = newNode;
        } else {
            Node temp = head;
            while (temp.next != null)
                temp = temp.next;
            temp.next = newNode;
        }
        System.out.println(" Medicine added successfully!");
    }

    public void display() {
        if (head == null) {
            System.out.println(" Inventory is empty.");
            return;
        }
        Node temp = head;
        while (temp != null) {
            System.out.println("-----------------------------");
            System.out.println(temp.data);
            System.out.println("-----------------------------\n");
            temp = temp.next;
        }
    }

    public Medicine searchById(String id) {
        Node temp = head;
        while (temp != null) {
            if (temp.data.getId().equalsIgnoreCase(id)) {
                return temp.data;
            }
            temp = temp.next;
        }
        return null;
    }
    public Medicine searchByName(String name) {
        Node current = head;
        while (current != null) {
            if (current.data.getName().equalsIgnoreCase(name)) {
                return current.data;
            }
            current = current.next;
        }
        return null;
    }

    public boolean updateQuantity(String id, int newQuantity) {
        Medicine med = searchById(id);
        if (med != null) {
            med.setQuantity(newQuantity);
            System.out.println(" Quantity updated successfully.");
            return true;
        }
        System.out.println(" Medicine with ID '" + id + "' not found.");
        return false;
    }

    public boolean removeById(String id) {
        if (head == null) return false;

        if (head.data.getId().equalsIgnoreCase(id)) {
            head = head.next;
            System.out.println(" Medicine removed successfully.");
            return true;
        }

        Node temp = head;
        while (temp.next != null && !temp.next.data.getId().equalsIgnoreCase(id)) {
            temp = temp.next;
        }

        if (temp.next != null) {
            temp.next = temp.next.next;
            System.out.println(" Medicine removed successfully.");
            return true;
        } else {
            System.out.println(" Medicine with ID '" + id + "' not found.");
            return false;
        }
    }

    public List<Medicine> getAllMedicines() {
        List<Medicine> list = new ArrayList<>();
        Node temp = head;
        while (temp != null) {
            list.add(temp.data);
            temp = temp.next;
        }
        return list;
    }

    public void removeExpired() {
        Node temp = head;
        Node prev = null;

        while (temp != null) {
            if (temp.data.isExpired()) {
                if (prev == null) {
                    head = temp.next;
                } else {
                    prev.next = temp.next;
                }
                System.out.println(" Removed expired medicine: " + temp.data.getName());
            } else {
                prev = temp;
            }
            temp = temp.next;
        }
    }

    public void exportToCSV(String filename) {
        try (FileWriter writer = new FileWriter(filename)) {
            writer.write("Name,ID,Quantity,ExpiryDate,Symptoms\n");
            Node temp = head;
            while (temp != null) {
                Medicine m = temp.data;
                String line = String.format("%s,%s,%d,%s,%s\n",
                        m.getName(),
                        m.getId(),
                        m.getQuantity(),
                        m.getExpiryDate(),
                        String.join(";", m.getSymptoms()));
                writer.write(line);
                temp = temp.next;
            }
            System.out.println(" Inventory exported to " + filename);
        } catch (IOException e) {
            System.out.println(" Error writing to file: " + e.getMessage());
        }
    }
}
