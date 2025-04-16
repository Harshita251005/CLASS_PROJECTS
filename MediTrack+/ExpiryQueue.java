import java.time.LocalDate;
import java.util.*;

public class ExpiryQueue {

    private Queue<Medicine> expiryQueue;

    public ExpiryQueue() {
        expiryQueue = new LinkedList<>();
    }

    public void enqueue(Medicine medicine) {
        expiryQueue.add(medicine);
    }

    public void loadFromInventory(List<Medicine> medicines) {
        expiryQueue.clear();
        expiryQueue.addAll(medicines);
    }

    public void showExpiredMedicines() {
        List<Medicine> expiredList = getExpiredMedicines();

        if (expiredList.isEmpty()) {
            System.out.println("\nNo expired medicines found.");
            return;
        }

        System.out.println("\n Expired Medicines:");
        printMedicineList(expiredList);
    }

   
    public void showExpiringSoon(int days) {
        List<Medicine> expiringSoonList = getExpiringSoonMedicines(days);

        if (expiringSoonList.isEmpty()) {
            System.out.println("\nNo medicines expiring within " + days + " days.");
            return;
        }

        System.out.println("\n Medicines expiring within " + days + " days:");
        printMedicineList(expiringSoonList);
    }

    
    public void removeExpired() {
        Queue<Medicine> updatedQueue = new LinkedList<>();
        for (Medicine med : expiryQueue) {
            if (!med.isExpired()) {
                updatedQueue.add(med);
            }
        }
        expiryQueue = updatedQueue;
        System.out.println("\n Removed expired medicines from expiry queue.");
    }


    public List<Medicine> getExpiredMedicines() {
        List<Medicine> expired = new ArrayList<>();
        for (Medicine med : expiryQueue) {
            if (med.isExpired()) {
                expired.add(med);
            }
        }
        return expired;
    }

   
    public List<Medicine> getExpiringSoonMedicines(int days) {
        List<Medicine> soon = new ArrayList<>();
        LocalDate threshold = LocalDate.now().plusDays(days);

        for (Medicine med : expiryQueue) {
            if (!med.isExpired() && med.getExpiryDate().isBefore(threshold)) {
                soon.add(med);
            }
        }
        return soon;
    }

    
    private void printMedicineList(List<Medicine> list) {
        list.sort(Comparator.comparing(Medicine::getExpiryDate));
        for (Medicine med : list) {
            System.out.println("-----------------------------");
            System.out.println(med);
            System.out.println("-----------------------------");
        }
    }
}
