export type PlantItem = {
  id: string;
  name: string;
  emoji: string;
};

export const FARM_CROPS: PlantItem[] = [
  // Cereals & Grains
  { id: "rice", name: "Rice", emoji: "🌾" },
  { id: "wheat", name: "Wheat", emoji: "🌾" },
  { id: "maize", name: "Maize / Corn", emoji: "🌽" },
  { id: "jowar", name: "Jowar / Sorghum", emoji: "🌾" },
  { id: "bajra", name: "Bajra / Pearl Millet", emoji: "🌾" },
  { id: "ragi", name: "Ragi / Finger Millet", emoji: "🌾" },
  { id: "barley", name: "Barley", emoji: "🌾" },
  
  // Pulses & Legumes
  { id: "chickpea", name: "Chickpea / Gram", emoji: "🧆" },
  { id: "pigeon_pea", name: "Pigeon Pea / Tur", emoji: "🌱" },
  { id: "moong", name: "Moong Bean", emoji: "🌱" },
  { id: "urad", name: "Urad Dal", emoji: "🌱" },
  { id: "lentil", name: "Lentil / Masoor", emoji: "🌱" },
  { id: "soybean", name: "Soybean", emoji: "🫘" },
  { id: "peas", name: "Peas", emoji: "🫛" },

  // Cash Crops & Commercial
  { id: "cotton", name: "Cotton", emoji: "☁️" },
  { id: "sugarcane", name: "Sugarcane", emoji: "🎋" },
  { id: "jute", name: "Jute", emoji: "🌿" },
  { id: "tobacco", name: "Tobacco", emoji: "🍂" },
  { id: "tea", name: "Tea", emoji: "🍵" },
  { id: "coffee", name: "Coffee", emoji: "☕" },
  { id: "rubber", name: "Rubber", emoji: "🌳" },

  // Oilseeds
  { id: "groundnut", name: "Groundnut", emoji: "🥜" },
  { id: "mustard", name: "Mustard", emoji: "🌼" },
  { id: "sunflower", name: "Sunflower", emoji: "🌻" },
  { id: "sesame", name: "Sesame / Til", emoji: "🌱" },
  { id: "castor", name: "Castor", emoji: "🌿" },
  { id: "coconut", name: "Coconut", emoji: "🥥" },

  // Vegetables
  { id: "tomato", name: "Tomato", emoji: "🍅" },
  { id: "potato", name: "Potato", emoji: "🥔" },
  { id: "onion", name: "Onion", emoji: "🧅" },
  { id: "brinjal", name: "Brinjal / Eggplant", emoji: "🍆" },
  { id: "cabbage", name: "Cabbage", emoji: "🥬" },
  { id: "cauliflower", name: "Cauliflower", emoji: "🥦" },
  { id: "okra", name: "Okra", emoji: "🥒" },
  { id: "carrot", name: "Carrot", emoji: "🥕" },
  { id: "radish", name: "Radish", emoji: "🥕" },
  { id: "spinach", name: "Spinach", emoji: "🥬" },
  { id: "bottle_gourd", name: "Bottle Gourd", emoji: "🥒" },
  { id: "bitter_gourd", name: "Bitter Gourd", emoji: "🥒" },
  { id: "pumpkin", name: "Pumpkin", emoji: "🎃" },
  { id: "cucumber", name: "Cucumber", emoji: "🥒" },
  { id: "capsicum", name: "Capsicum", emoji: "🫑" },
  { id: "chilli", name: "Chilli", emoji: "🌶️" },
  { id: "garlic", name: "Garlic", emoji: "🧄" },
  { id: "ginger", name: "Ginger", emoji: "🫚" },
  { id: "sweet_potato", name: "Sweet Potato", emoji: "🍠" },

  // Fruits
  { id: "mango", name: "Mango", emoji: "🥭" },
  { id: "banana", name: "Banana", emoji: "🍌" },
  { id: "apple", name: "Apple", emoji: "🍎" },
  { id: "grapes", name: "Grapes", emoji: "🍇" },
  { id: "papaya", name: "Papaya", emoji: "🍈" },
  { id: "guava", name: "Guava", emoji: "🍐" },
  { id: "pomegranate", name: "Pomegranate", emoji: "🍎" },
  { id: "orange", name: "Orange", emoji: "🍊" },
  { id: "lemon", name: "Lemon", emoji: "🍋" },
  { id: "pineapple", name: "Pineapple", emoji: "🍍" },
  { id: "watermelon", name: "Watermelon", emoji: "🍉" },
  { id: "muskmelon", name: "Muskmelon", emoji: "🍈" },
  { id: "jackfruit", name: "Jackfruit", emoji: "🍈" },

  // Spices
  { id: "turmeric", name: "Turmeric", emoji: "🫚" },
  { id: "black_pepper", name: "Black Pepper", emoji: "🌶️" },
  { id: "cardamom", name: "Cardamom", emoji: "🌱" },
  { id: "cumin", name: "Cumin", emoji: "🌱" },
  { id: "coriander", name: "Coriander", emoji: "🌿" },
  { id: "clove", name: "Clove", emoji: "🍂" }
];

export const HOME_PLANTS: PlantItem[] = [
  { id: "h_tomato", name: "Tomato", emoji: "🍅" },
  { id: "h_chilli", name: "Chilli", emoji: "🌶️" },
  { id: "tulsi", name: "Tulsi", emoji: "🌿" },
  { id: "aloe_vera", name: "Aloe Vera", emoji: "🌵" },
  { id: "rose", name: "Rose", emoji: "🌹" },
  { id: "money_plant", name: "Money Plant", emoji: "🪴" },
  { id: "hibiscus", name: "Hibiscus", emoji: "🌺" },
  { id: "mint", name: "Mint", emoji: "🌿" },
  { id: "coriander", name: "Coriander", emoji: "🌿" },
  { id: "curry_leaf", name: "Curry Leaf", emoji: "🌳" },
  { id: "snake_plant", name: "Snake Plant", emoji: "🐍" },
  { id: "peace_lily", name: "Peace Lily", emoji: "🌸" },
  { id: "basil", name: "Basil", emoji: "🌱" },
  { id: "marigold", name: "Marigold", emoji: "🌼" },
  { id: "jasmine", name: "Jasmine", emoji: "💮" },
  { id: "lemongrass", name: "Lemongrass", emoji: "🌾" },
  { id: "spinach", name: "Spinach", emoji: "🥬" },
  { id: "fenugreek", name: "Fenugreek", emoji: "🌱" }
];
