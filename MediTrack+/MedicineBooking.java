public class MedicineBooking {
    private String medicineName;
    private int quantity;
    private String userName;
    private String contact;

    public MedicineBooking(String medicineName, int quantity, String userName, String contact) {
        this.medicineName = medicineName;
        this.quantity = quantity;
        this.userName = userName;
        this.contact = contact;
    }

    public void displayBooking() {
        System.out.println("Medicine: " + medicineName);
        System.out.println("Quantity: " + quantity);
        System.out.println("Booked by: " + userName);
        System.out.println("Contact: " + contact);
    }

    public String getMedicineName() {
        return medicineName;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getUserName() {
        return userName;
    }

    public String getContact() {
        return contact;
    }
}
