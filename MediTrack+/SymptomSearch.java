import java.util.*;

public class SymptomSearch {

    private Map<String, List<String>> symptomMap;

    public SymptomSearch() {
        symptomMap = new HashMap<>();
        symptomMap.put("fever", Arrays.asList("Paracetamol", "Calpol", "Dolo"));
        symptomMap.put("headache", Arrays.asList("Saridon", "Disprin", "Paracetamol"));
        symptomMap.put("cold", Arrays.asList("Cetirizine", "Zyrtec", "Sinarest"));
        symptomMap.put("cough", Arrays.asList("Benadryl", "Ascoril", "Corex"));
        symptomMap.put("pain", Arrays.asList("Brufen", "Ibuprofen", "Combiflam"));
        symptomMap.put("vomiting", Arrays.asList("Ondem", "Domperidone", "Emeset"));
        symptomMap.put("acidity", Arrays.asList("Gelusil", "Digene", "Pantop"));
        symptomMap.put("allergy", Arrays.asList("Allegra", "Avil", "Levocetirizine"));
        symptomMap.put("diarrhea", Arrays.asList("Eldoper", "Loperamide", "ORS"));
        symptomMap.put("constipation", Arrays.asList("Lactulose", "Duphalac", "Cremaffin"));
    }

    public List<String> getSuggestions(String symptom) {
        return symptomMap.getOrDefault(symptom.toLowerCase(), new ArrayList<>());
    }

    public void showAllSymptoms() {
        System.out.println(" Available symptoms for suggestions:");
        for (String symptom : symptomMap.keySet()) {
            System.out.println( symptom);
        }
    }
}
