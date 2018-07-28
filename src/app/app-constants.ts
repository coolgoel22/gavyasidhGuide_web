export class Constants{
    public static getCitiesOfAState(state): string[]{
        let stateNCities =  {
            "Andhra Pradesh": ["Adoni", "Amaravati", "Anantapur", "Bhimavaram", "Chilakaluripet", "Chittoor", "Dharmavaram", "Eluru", "Gudivada", "Guntakal", "Guntur", "Hindupur", "Kadapa", "Kakinada", "Kurnool", "Machilipatnam", "Madanapalle", "Nandyal", "Narasaraopet", "Nellore", "Ongole", "Proddatur", "Rajamundry", "Srikakulam", "Tadepalligudem", "Tadipatri", "Tenali", "Tirupati", "Vijayawada", "Visakhapatnam", "Vizianagaram"],

            "Arunachal Pradesh":["Anjaw", "Changlang", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Papum Pare", "Siang", "Tawang", "Tirap", "Upper Dibang Valley", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],

            "Bihar": ["Arrah", "Aurangabad", "Bagaha", "Begusarai", "Bettiah", "Bhagalpur", "Bihar    Sharif", "Buxar", "Chhapra", "Danapur", "Darbhanga", "Dehri", "Gaya", "Hajipur", "Jamalpur", "Jehanabad", "Katihar", "Kishanganj", "Motihari", "Munger", "Muzaffarpur", "Nawada", "Patna", "Purnia", "Saharsa", "Sasaram", "Sitamarhi", "Siwan"],
            
            "Chhattisgarh": ["Bastar", "Bhilai-Durg", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Janjgir-champa", "Jashpur", "Kabeerdham", "Kanker", "Korba", "Koriya", "Mahasamund", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sarguja"],

            "Delhi": ["BTM Bagh", "Chanakyapuri", "Civil Lines", "Connaught Place", "Daryaganj", "Defence Colony", "Delhi Cantonment", "Hauz Khas", "IT park Garden", "Kalkaji", "Karol Bagh", "Kirari", "Kotwali", "Laxmi Nagar", "Model Town", "Najafgarh", "Narela", "Naveen Shahdara", "Paharganj", "Parliament Street", "Patel Nagar", "Preet Vihar", "Prem Nagar", "Rohtash Nagar", "Sadar Bazaar", "Saraswati Vihar", "Shahdara", "Suleman Nagar", "Vasant Vihar", "Vivek Vihar"],
            
            "Goa":["Bicholim", "Canacona", "Cuncolim", "Curchorem", "Mapusa", "Margao", "Mormugao", "Panaji", "Pernem", "Ponda", "Quepem", "Sanguem", "Sanquelim", "Valpoi"],

            "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota", "Udaipur", "Dahod", "Dang", "Devbhoomi", "Dwarka", "Gandhinagar", "Gir", "Somnath", "Jamnagar", "Junagadh", "Kutch", "Kheda", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],

            "Haryana":["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurgaon", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],

            "Himachal Pradesh": ["Arki", "Baddi", "Bakloh Cantonment", "Banjar", "Bhota", "Bhuntar", "Bilaspur", "Chamba", "Chaupal", "Chuari Khas", "Dagshai Cantonment", "Dalhousie", "DalhousieCantonment", "Daulatpur", "Dera Gopipur", "Dharmsala", "Gagret", "Ghumarwin", "Hamirpur", "Indora", "Jawalamukhi", "Jhakhri", "Jogindernagar", "Jubbal", "Jutogh Cantonment", "Kangra", "Kasauli Cantonment", "Kotkhai", "Kullu", "Manali", "Mandi", "Mehatpur Basdehra", "Nadaun", "Nagrota Bagwan", "Nahan", "Naina Devi", "Nalagarh", "Narkanda", "Nurpur", "Palampur", "Paonta Sahib", "Parwanoo", "Rajgarh", "Rampur", "Rewalsar", "Rohru", "Sabathu Cantonment", "Santokhgarh", "Sarkaghat", "Seoni", "Shamshi", "Shimla", "Solan", "Sundarnagar", "Talai", "Theog", "Tira Sujanpur", "Una", "Yol Cantonment"],
            
            "Jammu & Kashmir":["Doda", "Jammu", "Kathua", "Kishtwar", "Poonch", "Rajouri", "Ramban", "Reasi", "Samba", "Udhampur"],

            "Jharkhand":["Bokaro Steel City", "Chirkunda", "Deoghar", "Dhanbad", "Giridih", "Hazaribagh", "Jamshedpur", "Medininagar", "Phusro", "Ramgarh", "Ranchi"],

            "Karnataka": ["Bagalkot", "Bengaluru Urban", "Bengaluru Rural", "Belagavi", "Ballari", "Bidar", "Vijayapur", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere",  "Dharwad", "Gadag", "Kalaburagi", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Yadgir"],

            "Kerala":["Adoor", "Anchal", "Attingal", "Beypore", "Calicut", "Cannanore", "Chalakkudy", "Changanassery", "Chavakkad", "Cherthala", "Kalamassery", "Kanhangad", "Kannur", "Kasaragod", "Kattappana", "Kayamkulam", "Kochi", "Kollam", "Kottakkal", "Kottarakara", "Koyilandy", "Kunnamkulam", "Malappuram", "Mananthavady", "Manjeri", "Manjeshwaram", "Maradu", "Mattanur", "Muvattupuzha", "Nedumangad", "Neyyattinkara", "Nileshwaram", "Ottappalam", "Palakkad", "Pandalam", "Paravur", "Pathanamthitta", "Payyanur", "Perinthalmanna", "Ponnani", "Punalur", "Ramanattukara", "Shornur", "Taliparamba", "Tellicherry", "Thalassery", "Thirurangadi", "Thiruvananthapuram", "Thrissur", "Tirur", "Tiruvalla", "Uppala", "Varkala", "Vatakara"],

            "Madhya Pradesh": ["Bhopal", "Chambal", "Gwalior", "Indore", "Jabalpur", "Narmadapuram", "Rewa", "Sagar", "Shahdol", "Ujjain"],

            "Maharashtra":["Ahmednagar", "Akola", "Achalpur", "Amravati", "Aurangabad", "Beed", "Chandrapur", "Dhule", "Gondia", "Bhusawal", "Jalgaon", "Jalna", "Ichalkaranji", "Kolhapur", "Latur", "Greater Mumbai", "Kamptee", "Nagpur", "Nanded-Waghela ", "Nandurbar", "Malegaon", "Nashik", "Osmanabad", "Navi Mumbai Panvel Raigad CT", "Panvel", "Parbhani", "Pune", "Sangli", "Satara", "Barshi", "Solapur", "Bhiwandi-Nizampur", "Vasai-Virar", "Wardha", "Yavatmal", "Udgir"],

            "Odisha": ["Angul" , "Boudh" , "Balangir" , "Bargarh" , "Balasore" , "Bhadrak" , "Cuttack" , "Debagarh" , "Dhenkanal" , "Ganjam" , "Gajapati" , "Jharsuguda" , "Jajpur" , "Jagatsinghapur" , "Khordha" , "Kendujhar" , "Kalahandi" , "Kandhamal" , "Koraput" , "Kendrapara" , "Malkangiri" , "Mayurbhanj" , "Nabarangpur" , "Nuapada" , "Nayagarh" , "Puri" , "Rayagada" , "Sambalpur" , "Subarnapur" , "Sundergarh"],

            "Punjab":["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Firozpur", "Fazilka", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Sri Muktsar Sahib", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Taran Taran"],
            
            "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalor", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],

            "Tamil Nadu": ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanniyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
            
            "Telangana": ["Adilabad", "Hyderabad", "Karimnagar", "Khammam", "Mahabubnagar", "Nalgonda", "Nizamabad", "Ramagundam", "Suryapet", "Warangal"],

            "Uttarakhand": ["Dehradun", "Haldwani", "Haridwar", "Kashipur", "Rishikesh", "Roorkee", "Rudrapur"],

            "Uttar Pradesh":["Agra", "Firozabad", "Mainpuri", "Mathura", "Aligarh", "Etah", "Hathras",      "Kasganj", "Allahabaad", "Fatehpur", "Kaushambi", "Pratapgarh", "Azamgarh", "Ballia", "Mau", "Budaun", "Bareilly", "Pilibhit", "Shahjahanpur", "Basti", "Sant Kabir Nagar", "Siddharthnagar", "Banda", "Chitrakoot", "Hamirpur", "Mahoba", "Bahraich", "Balarampur", "Gonda", "Shravasti", "Ambedkar Nagar", "Amethi", "Barabanki", "Faizabad", "Sultanpur", "Deoria", "Gorakhpur", "Kushinagar", "Maharajganj", "Jalaun", "Jhansi", "Lalitpur", "Auraiya", "Etawah", "Farrukhabad", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Hardoi", "Lakhimpur Kheri", "Lucknow", "Raebareli", "Sitapur", "Unnao", "Bagpat", "Bulandshahr", "Gautam Buddha Nagar", "Ghaziabad", "Hapur", "Meerut", "Mirzapur", "Sant Ravidas Nagar", "Sonbhadra", "Amroha", "Bijnor", "Moradabad", "Rampur", "Sambhal", "Muzaffarnagar", "Saharanpur", "Shamli", "Chandauli", "Ghazipur", "Jaunpur", "Varanasi"],

            "West Bengal": ["Alipurduar", "Asansol", "Baharampur", "Balurghat", "Bangaon", "Bankura", "Bardhaman", "Basirhat", "Chakdaha", "Cooch Behar", "Dankuni", "Darjeeling", "Dhulian", "Durgapur", "Habra", "Haldia", "Jalpaiguri", "Jangipur", "Kharagpur", "Kolkata", "Krishnanagar", "Malda", "Medinipur", "Nabadwip", "Purulia", "Raiganj", "Ranaghat", "Shantipur", "Siliguri"]
        }

        return stateNCities[state];
    }
    
    public static getStates(): string[] {
        return ["Andhra Pradesh", "Arunachal Pradesh", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttarakhand", "Uttar Pradesh", "West Bengal"];
        // return ["Assam", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", , "Tripura",  ];
    }
    public static getProductCategory(): any {
        return [
            {key:"1", name:"गौ क्षीर से बनने वाले उत्पाद"},
            {key:"2", name:"गोमय से बनने वाले उत्पाद"}, 
            {key:"3", name:"गौमूत्र से बनने वाले उत्पाद"},
            {key:"4", name:"गौमूत्र अर्क और उससे बनने वाले उत्पाद"},
            {key:"5", name:"गौमूत्र क्षार और उससे बनने वाले उत्पाद"},
            {key:"6", name:"गौमूत्र घन ओर उससे बनने वाले उत्पाद"},
            {key:"8", name:"पंचगव्य ओर उससे बनने वाले उत्पाद"},
            {key:"7", name:"कृषि उत्पाद"}
         ]
    }
    public static getProductsList(): any {
        return {
            "1": [
                    {key: '1_1', name:'गौ क्षीर'},
                    {key: '1_2', name:'गौ घृत'}
                ],
            "2": [
                    {key: '2_1', name:'गोमय मच्छर प्रतिबंधक धूपबत्ती'}, 
                    {key: '2_2', name:'गोमय भस्म (सर्व विकार)'},
                    {key: '2_3', name:'बर्तन स्वच्छ करनेवाला चूर्ण'},
                    {key: '2_4', name:'गोमय दंतमंजन'},
                    {key: '2_5', name:'Mobile Anti-Radiation Chip'}
                ],
            "3": [
                    {key: '3_1', name:'केशसंवर्धक तेल'},
                    {key: '3_2', name:'गौमूत्र नेत्रौषधी (आँखो के विकार)'},
                    {key: '3_3', name:'गौमूत्र कर्ण औषधि (कानों के विकार)'},
                    {key: '3_4', name:'गौमूत्र आसव (श्वसनतंत्र के विकार)'},
                    {key: '3_5', name:'बालपाल रस (छोटे बच्चों के विकार)'},
                    {key: '3_6', name:'नारी संजीवनी (स्त्रियों के विकार)'},
                    {key: '3_7', name:'गौमूत्र अर्क चंद्रमा (सर्व विकार)'},
                    {key: '3_8', name:'गौमूत्र नीम स्प्रे (त्वचाविकार)'}
                ],
            "4": [
                    {key: '4_1', name:'गौमूत्र अर्क - तुलसी'},
                    {key: '4_2', name:'गौमूत्र अर्क - पारिजात'},
                    {key: '4_3', name:'नंदी  अर्क - सहजन'},
                    {key: '4_4', name:'गौमूत्र अर्क - कालमेघ'},
                    {key: '4_5', name:'गौमूत्र अर्क - अर्जुन'},
                    {key: '4_6', name:'गौमूत्र अर्क - इन्सुलिन'},
                    {key: '4_7', name:'गौमूत्र अर्क - सप्तरंगी'},
                    {key: '4_8', name:'गौमूत्र अर्क - सर्पगंधा'},
                    {key: '4_9', name:'गौमूत्र अर्क - पुनर्नवा'},
                    {key: '4_10', name:'गौमूत्र अर्क - सदाबहार'},
                    {key: '4_11', name:'गौमूत्र अर्क - गोखरू'},
                    {key: '4_12', name:'गौमूत्र अर्क - ब्राह्मी'},
                    {key: '4_13', name:'गौमूत्र अर्क - वरुण'},
                    {key: '4_14', name:'गौमूत्र अर्क - कांचनार'},
                    {key: '4_15', name:'गौमूत्र अर्क - गिलोय'},
                    {key: '4_16', name:'गौमूत्र अर्क - पाषाणभेद'},
                    {key: '4_17', name:'गौमूत्र अर्क - मुलेहड़ी'}
                ],
            "5": [
                    {key: '5_1', name:'गौमूत्र गेंदा स्प्रे (व्रण)'},
                    {key: '5_2', name:'गौमूत्र शैम्पू (कैश विकार)'},
                    {key: '5_3', name:'गव्य पित्तशामक चूर्ण'},
                    {key: '5_4', name:'गव्य पित्त बर्हिगमन चूर्ण'},
                    {key: '5_5', name:'वर्धमान त्रिफला गौमूत्र चूर्ण (सर्व विकार)'},
                    {key: '5_6', name:'गौमूत्र मधुमेहारि चूर्ण (मधुमेह)'},
                    {key: '5_7', name:'गौमूत्र गेंदा मलहम (व्रण)'},
                    {key: '5_8', name:'गौमूत्र मंजिष्ठा मलहम (त्वचा विकार)'},
                    {key: '5_9', name:'श्वेत कोढ़ नाशक मलहम'}
                ],
            "6": [
                    {key: '6_1', name:'गौमूत्र घनवटी'},
                    {key: '6_2', name:'गौमूत्र मलहम (त्वचा विकार)'}
                ],
            "7": [
                    {key: '7_1', name:'गौमूत्र कीटनाशक'},
                    {key: '7_2', name:'दशपर्णी अर्क (जैविक कीटनाशक)'},
                    {key: '7_3', name:'जीवामृत (जैविक खाद)'}
                ],
            "8": [
                {key: '8_1', name:'नासिका'},
                {key: '8_2', name:'मुखलेप'},
                {key: '8_3', name:'सनान चूर्ण'},
                {key: '8_4', name: 'पंचगव्य घृत'}
            ]
        };
    }
    public static getProductCategoryObj():any{
        return {
            1: "गौ क्षीर से बनने वाले उत्पाद",
            2: "गोमय से बनने वाले उत्पाद", 
            3: "गौमूत्र से बनने वाले उत्पाद",
            4: "गौमूत्र अर्क और उससे बनने वाले उत्पाद",
            5: "गौमूत्र क्षार और उससे बनने वाले उत्पाद",
            6: "गौमूत्र घन ओर उससे बनने वाले उत्पाद",
            7: "कृषि उत्पाद",
            8:"पंचगव्य ओर उससे बनने वाले उत्पाद"
        };
    }
    public static getProductNameObj():any{
        return {
            "1_1" :   "गौ क्षीर",
            "1_2" :   "गौ घृत",
            "2_1" :   "गोमय मच्छर प्रतिबंधक धूपबत्ती",
            "2_2" :   "गोमय भस्म (सर्व विकार)",
            "2_3" :   "बर्तन स्वच्छ करनेवाला चूर्ण",
            "2_4" :   "गोमय दंतमंजन",
            "3_1" :   "केशसंवर्धक तेल",
            "3_2" :   "गौमूत्र नेत्रौषधी (आँखो के विकार)",
            "3_3" :   "गौमूत्र कर्ण औषधि (कानों के विकार)",
            "3_4" :   "गौमूत्र आसव (श्वसनतंत्र के विकार)",
            "3_5" :   "बालपाल रस (छोटे बच्चों के विकार)",
            "3_6" :   "नारी संजीवनी (स्त्रियों के विकार)",
            "3_7" :   "गौमूत्र चंद्रमा अर्क (सर्व विकार)",
            "3_8" :   "गौमूत्र नीम स्प्रे (त्वचाविकार)",
            "4_1" :   "गौमूत्र अर्क - तुलसी",
            "4_2" :   "गौमूत्र अर्क - पारिजात",
            "4_3" :   "नंदी  अर्क - सहजन",
            "4_4" :   "गौमूत्र अर्क - कालमेघ",
            "4_5" :   "गौमूत्र अर्क - अर्जुन",
            "4_6" :   "गौमूत्र अर्क - इन्सुलिन",
            "4_7" :   "गौमूत्र अर्क - सप्तरंगी",
            "4_8" :   "गौमूत्र अर्क - सर्पगंधा",
            "4_9" :   "गौमूत्र अर्क - पुनर्नवा",
            "4_10" :  "गौमूत्र अर्क - सदाबहार",
            "4_11" :  "गौमूत्र अर्क - गोखरू",
            "4_12" :  "गौमूत्र अर्क - ब्राह्मी",
            "4_13" :  "गौमूत्र अर्क - वरुण",
            "4_14" :  "गौमूत्र अर्क - कांचनार",
            "4_15" :  "गौमूत्र अर्क - गिलोय",
            "4_16" :  "गौमूत्र अर्क - पाषाणभेद",
            "4_17" :  "गौमूत्र अर्क - मुलेहड़ी",
            "5_1" :   "गौमूत्र गेंदा स्प्रे (व्रण)",
            "5_2" :   "गौमूत्र शैम्पू (कैश विकार)",
            "5_3" :   "गव्य पित्तशामक चूर्ण",
            "5_4" :   "गव्य पित्त बर्हिगमन चूर्ण",
            "5_5" :   "वर्धमान त्रिफला गौमूत्र चूर्ण (सर्व विकार)",
            "5_6" :   "गौमूत्र मधुमेहारि चूर्ण (मधुमेह)",
            "5_7" :   "गौमूत्र गेंदा मलहम (व्रण)",
            "5_8" :   "गौमूत्र मंजिष्ठा मलहम (त्वचा विकार)",
            "5_9" :   "श्वेत कोढ़ नाशक मलहम",
            "6_1" :   "गौमूत्र घनवटी",
            "6_2" :   "गौमूत्र मलहम (त्वचा विकार)",
            "7_1" :   "गौमूत्र कीटनाशक",
            "7_2" :   "दशपर्णी अर्क (जैविक कीटनाशक)",
            "7_3" :   "जीवामृत (जैविक खाद)",
            "8_1" :    "नासिका",
            "8_2" :    "मुखलेप",
            "8_3" :    "सनान चूर्ण",
            "8_4" :    "पंचगव्य घृत"
        }
    }
}