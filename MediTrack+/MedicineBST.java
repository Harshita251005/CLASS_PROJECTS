public class MedicineBST {

   private static class Node {
       Medicine data;
       Node left, right;

       Node(Medicine data) {
           this.data = data;
       }
   }

   private Node root;

   public void insert(Medicine medicine) {
       root = insertRec(root, medicine);
   }

   private Node insertRec(Node root, Medicine medicine) {
       if (root == null) {
           return new Node(medicine);
       }

       if (medicine.compareTo(root.data) < 0) {
           root.left = insertRec(root.left, medicine);
       } else if (medicine.compareTo(root.data) > 0) {
           root.right = insertRec(root.right, medicine);
       }
       return root;
   }

   public Medicine search(String name) {
       return searchRec(root, name);
   }

   private Medicine searchRec(Node root, String name) {
       if (root == null) return null;

       int cmp = name.compareToIgnoreCase(root.data.getName());
       if (cmp == 0)
           return root.data;
       else if (cmp < 0)
           return searchRec(root.left, name);
       else
           return searchRec(root.right, name);
   }

   public void displayAlphabetically() {
       if (root == null) {
           System.out.println(" No medicines in inventory.");
       } else {
           System.out.println("\n Medicines in Alphabetical Order:");
           inOrderTraversal(root);
       }
   }

   private void inOrderTraversal(Node node) {
       if (node != null) {
           inOrderTraversal(node.left);
           System.out.println("-----------------------------");
           System.out.println(node.data);
           System.out.println("-----------------------------");
           inOrderTraversal(node.right);
       }
   }

   public void loadFromInventory(java.util.List<Medicine> medicines) {
       for (Medicine med : medicines) {
           insert(med);
       }
   }

   public void searchByPrefix(String prefix) {
       System.out.println(" Medicines starting with: " + prefix);
       searchByPrefixRec(root, prefix.toLowerCase());
   }

   private void searchByPrefixRec(Node node, String prefix) {
       if (node == null) return;
       String medName = node.data.getName().toLowerCase();
       if (medName.startsWith(prefix)) {
           System.out.println(node.data);
           System.out.println("-----------------------------");
       }
       searchByPrefixRec(node.left, prefix);
       searchByPrefixRec(node.right, prefix);
   }
}
