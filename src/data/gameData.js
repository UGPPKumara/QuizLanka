// --- 1. GAME DATA ---

// --- IMAGE IMPORTS ---
//
// 1. ඔබගේ සියලුම පින්තූර `src/assets` ෆෝල්ඩරයට දමන්න.
// 2. පහත දැක්වෙන ආකාරයට ඒවා මෙහි import කරන්න:
//
import junglefowlImage from '../assets/peacock.webp';
// import elephantImage from '../assets/quiz-images/elephant.png';
// import leopardImage from '../assets/quiz-images/leopard.jpg';
// ... (සහ අනෙකුත් සියලුම පින්තූර) ...
//
// 3. ඉන්පසු, එක් එක් ප්‍රශ්නයේ ඇති 'image:' අගය,
//    උදා: "https://placehold.co/..." වෙනුවට අදාල variable නම (උදා: junglefowlImage) යොදන්න.
//
// --- END IMAGE IMPORTS ---


export const gameData = [
  {
    // --- LEVEL 1 ---
    levelName: "Level 1: Sri Lankan Animals / 1 වන අදියර: ශ්‍රී ලංකාවේ සතුන්",
    questions: [
        { 
            question: "What is the national bird of Sri Lanka? / ශ්‍රී ලංකාවේ ජාතික පක්ෂියා කවුද?", 
            answer: ["Sri Lanka Junglefowl", "වළි කුකුළා", "wali kukula", "walikukula"], 
            options: [
                { en: "Peacock", si: "මොනරා" },
                { en: "Sri Lanka Junglefowl", si: "වළි කුකුළා" },
                { en: "Myna", si: "මයිනා" },
                { en: "Kingfisher", si: "පිළිහුඩුවා" }
            ], 
            image:  junglefowlImage
        },
        { 
            question: "Which large mammal is seen in Yala? / යාල වනෝද්‍යානයේ දැකිය හැකි විශාල ක්ෂීරපායී සත්වයා කුමක්ද?", 
            answer: ["Elephant", "අලියා", "aliya"], 
            options: [
                { en: "Rhino", si: "රයිනෝ" },
                { en: "Hippo", si: "හිපෝ" },
                { en: "Elephant", si: "අලියා" },
                { en: "Buffalo", si: "මී හරකා" }
            ], 
            image: "https://placehold.co/400x300/72BBE0/333?text=Asian+Elephant"
        },
        { 
            question: "What spotted cat is the apex predator in Sri Lanka? / ශ්‍රී ලංකාවේ ප්‍රධාන විලෝපිකයා කුමක්ද?", 
            answer: ["Leopard", "දිවියා", "diviya", "කොටියා", "kotiya"],
            options: [
                { en: "Tiger", si: "ව්‍යාඝ්‍රයා" },
                { en: "Leopard", si: "දිවියා" },
                { en: "Cheetah", si: "චීටා" },
                { en: "Lion", si: "සිංහයා" }
            ], 
            image: "https://placehold.co/400x300/E0D072/333?text=Sri+Lankan+Leopard" 
        },
        { 
            question: "Which primate is known for its purple face? / දම් පැහැති මුහුණක් ඇති ප්‍රයිමේට් සත්වයා කවුද?", 
            answer: ["Purple-faced Langur", "කළු වඳුරා", "kalu wandura"], 
            options: [
                { en: "Toque Macaque", si: "රිළවා" },
                { en: "Grey Langur", si: "අළු වඳුරා" },
                { en: "Purple-faced Langur", si: "කළු වඳුරා" },
                { en: "Lorris", si: "උණහපුළුවා" }
            ], 
            image: "https://placehold.co/400x300/A972E0/333?text=Purple-faced+Langur" 
        },
        { 
            question: "What is the small, native deer species? / ශ්‍රී ලංකාවට ආවේණික කුඩා මුව විශේෂය කුමක්ද?", 
            answer: ["Spotted Deer", "තිත් මුවා", "thith muwa"], 
            options: [
                { en: "Sambar", si: "ගෝනා" },
                { en: "Barking Deer", si: "ඕලු මුවා" },
                { en: "Mouse Deer", si: "මීමින්නා" },
                { en: "Spotted Deer", si: "තිත් මුවා" }
            ], 
            image: "https://placehold.co/400x300/E0A072/333?text=Spotted+Deer" 
        },
        { 
            question: "Which marine mammal can be seen off Mirissa? / මිරිස්ස වෙරළ තීරයේ දැකිය හැකි සමුද්‍ර ක්ෂීරපායී සත්වයා?", 
            answer: ["Blue Whale", "නිල් තල්මසා", "nil thalmasa"], 
            options: [
                { en: "Dolphin", si: "ඩොල්ෆින්" },
                { en: "Blue Whale", si: "නිල් තල්මසා" },
                { en: "Shark", si: "මෝරා" },
                { en: "Seal", si: "සීල්" }
            ], 
            image: "https://placehold.co/400x300/728EE0/333?text=Blue+Whale" 
        },
        { 
            question: "What is the common name for the 'Rilawa' monkey? / 'රිළවා' යනු කවුද?", 
            answer: ["Toque Macaque", "රිළවා", "rilawa"], 
            options: [
                { en: "Toque Macaque", si: "රිළවා" },
                { en: "Baboon", si: "බැබූන්" },
                { en: "Gorilla", si: "ගෝරිල්ලා" },
                { en: "Orangutan", si: "උරංඋටන්" }
            ], 
            image: "https://placehold.co/400x300/E0B672/333?text=Toque+Macaque" 
        },
        { 
            question: "Which large bear eats termites? / වේයන් කන ලොකු වලස් විශේෂය කුමක්ද?", 
            answer: ["Sloth Bear", "කළු වලසා", "kalu walasa"], 
            options: [
                { en: "Grizzly Bear", si: "ග්‍රිස්ලි" },
                { en: "Black Bear", si: "කළු වලසා" },
                { en: "Sloth Bear", si: "කළු වලසා" },
                { en: "Sun Bear", si: "හිරු වලසා" }
            ], 
            image: "https://placehold.co/400x300/8C72E0/333?text=Sloth+Bear" 
        },
        { 
            question: "What colorful bird has a long tail? / දිගු වලිගයක් ඇති වර්ණවත් පක්ෂියා?", 
            answer: ["Peacock", "මොනරා", "monara"], 
            options: [
                { en: "Hornbill", si: "කෑදැත්තා" },
                { en: "Parrot", si: "ගිරවා" },
                { en: "Peacock", si: "මොනරා" },
                { en: "Eagle", si: "රාජාලියා" }
            ], 
            image: "https://placehold.co/400x300/72E0C6/333?text=Peacock" 
        },
        { 
            question: "What is the largest reptile in Sri Lanka? / ශ්‍රී ලංකාවේ විශාලතම උරගයා?", 
            answer: ["Saltwater Crocodile", "ගැට කිඹුලා", "geta kimbula"], 
            options: [
                { en: "Python", si: "පිඹුරා" },
                { en: "Cobra", si: "නයා" },
                { en: "Water Monitor", si: "කබරගොයා" },
                { en: "Saltwater Crocodile", si: "ගැට කිඹුලා" }
            ], 
            image: "https://placehold.co/400x300/78E072/333?text=Saltwater+Crocodile" 
        }
    ]
  },
  {
    // --- LEVEL 2 ---
    levelName: "Level 2: Places & Food / 2 වන අදියර: ස්ථාන සහ ආහාර",
    questions: [
        { 
            question: "What is the ancient rock fortress? / පුරාණ ගල් පර්වත බලකොටුව කුමක්ද?", 
            answer: ["Sigiriya", "සීගිරිය", "sigiriya"], 
            options: [
                { en: "Sigiriya", si: "සීගිරිය" },
                { en: "Anuradhapura", si: "අනුරාධපුර" },
                { en: "Polonnaruwa", si: "පොළොන්නරුව" },
                { en: "Kandy", si: "මහනුවර" }
            ], 
            image: "https://placehold.co/400x300/E0A072/333?text=Sigiriya+Rock" 
        },
        { 
            question: "What is the 'Temple of the Tooth' called? / 'දළදා මාළිගාව'ට කියන නම?", 
            answer: ["Dalada Maligawa", "දළදා මාළිගාව", "dalada maligawa"], 
            options: [
                { en: "Ruwanwelisaya", si: "රුවන්වැලිසෑය" },
                { en: "Dalada Maligawa", si: "දළදා මාළිගාව" },
                { en: "Jetavanaramaya", si: "ජේතවනාරාමය" },
                { en: "Thuparamaya", si: "ථූපාරාමය" }
            ], 
            image: "https://placehold.co/400x300/E07272/333?text=Dalada+Maligawa" 
        },
        { 
            question: "Main city in the hill country? / කඳුකරයේ ප්‍රධාන නගරය?", 
            answer: ["Kandy", "මහනුවර", "mahanuwara", "nuwara"], 
            options: [
                { en: "Nuwara Eliya", si: "නුවර එළිය" },
                { en: "Kandy", si: "මහනුවර" },
                { en: "Ella", si: "ඇල්ල" },
                { en: "Badulla", si: "බදුල්ල" }
            ], 
            image: "https://placehold.co/400x300/72E08E/333?text=Kandy+Lake" 
        },
        { 
            question: "Popular noodle-like breakfast food? / නූඩ්ල්ස් වැනි උදෑසන ආහාරය?", 
            answer: ["String Hoppers", "ඉඳිආප්ප", "idiappa"], 
            options: [
                { en: "Hoppers", si: "ආප්ප" },
                { en: "Pittu", si: "පිට්ටු" },
                { en: "Roti", si: "රොටී" },
                { en: "String Hoppers", si: "ඉඳිආප්ප" }
            ], 
            image: "https://placehold.co/400x300/DDE072/333?text=String+Hoppers" 
        },
        { 
            question: "Coastal town famous for its Dutch fort? / ලන්දේසි බලකොටුවක් ඇති වෙරළබඩ නගරය?", 
            answer: ["Galle", "ගාල්ල", "galla"], 
            options: [
                { en: "Matara", si: "මාතර" },
                { en: "Galle", si: "ගාල්ල" },
                { en: "Colombo", si: "කොළඹ" },
                { en: "Trincomalee", si: "ත්‍රිකුණාමලය" }
            ], 
            image: "https://placehold.co/400x300/72BBE0/333?text=Galle+Fort" 
        },
        { 
            question: "Popular bowl-shaped pancake? / බඳුනක හැඩැති පෑන්කේක් එක?", 
            answer: ["Hoppers", "ආප්ප", "aappa"], 
            options: [
                { en: "Hoppers", si: "ආප්ප" },
                { en: "Roti", si: "රොටී" },
                { en: "Paratha", si: "පරාතා" },
                { en: "Dosa", si: "තෝසේ" }
            ], 
            image: "https://placehold.co/400x300/E0D072/333?text=Hoppers" 
        },
        { 
            question: "Highest mountain in Sri Lanka? / ශ්‍රී ලංකාවේ උසම කන්ද?", 
            answer: ["Piduruthalagala", "පිදුරුතලාගල", "piduruthalagala"], 
            options: [
                { en: "Adams Peak", si: "සමනළ කන්ද" },
                { en: "Knuckles", si: "නකල්ස්" },
                { en: "Piduruthalagala", si: "පිදුරුතලාගල" },
                { en: "Haputale", si: "හපුතලේ" }
            ], 
            image: "https://placehold.co/400x300/72E0C6/333?text=Piduruthalagala"
        },
        { 
            question: "Spicy condiment made with coconut and chili? / පොල් සහ මිරිස් වලින් සාදන සැර සම්බෝලය?", 
            answer: ["Pol Sambol", "පොල් සම්බෝල", "pol sambola"], 
            options: [
                { en: "Lunu Miris", si: "ලුනු මිරිස්" },
                { en: "Seeni Sambol", si: "සීනි සම්බෝල" },
                { en: "Pol Sambol", si: "පොල් සම්බෝල" },
                { en: "Katta Sambol", si: "කට්ට සම්බෝල" }
            ], 
            image: "https://placehold.co/400x300/E07A72/333?text=Pol+Sambol" 
        },
        { 
            question: "Most famous national park for leopards? / දිවියන් සඳහා ප්‍රසිද්ධම ජාතික වනෝද්‍යානය?", 
            answer: ["Yala", "යාල", "yala"], 
            options: [
                { en: "Wilpattu", si: "විල්පත්තු" },
                { en: "Yala", si: "යාල" },
                { en: "Udawalawe", si: "උඩවලව" },
                { en: "Minneriya", si: "මින්නේරිය" }
            ], 
            image: "https://placehold.co/400x300/A0E072/333?text=Yala+National+Park" 
        },
        { 
            question: "Famous scenic train journey? / සුන්දර දර්ශන ඇති දුම්රිය ගමන?", 
            answer: ["Kandy to Ella", "නුවර සිට ඇල්ල", "kandy ella"], 
            options: [
                { en: "Colombo to Galle", si: "කොළඹ සිට ගාල්ල" },
                { en: "Kandy to Ella", si: "නුවර සිට ඇල්ල" },
                { en: "Colombo to Jaffna", si: "කොළඹ සිට යාපනය" },
                { en: "Anuradhapura to Polonnaruwa", si: "අ'පුර සිට පොළොන්නරුව" }
            ], 
            image: "https://placehold.co/400x300/72C6E0/333?text=Kandy+to+Ella+Train" 
        }
    ]
  },
  {
    // --- LEVEL 3 ---
    levelName: "Level 3: History / 3 වන අදියර: ඉතිහාසය",
    questions: [
      { 
          question: "When did Sri Lanka get independence? / ශ්‍රී ලංකාවට නිදහස ලැබුණේ කවදාද?", 
          answer: ["1948"], 
          options: [
              { en: "1947", si: "1947" },
              { en: "1948", si: "1948" },
              { en: "1950", si: "1950" },
              { en: "1972", si: "1972" }
          ], 
          image: "https://placehold.co/400x300/FF5733/333?text=Independence+1948" 
      },
      { 
          question: "Who was the first king of Anuradhapura? / අනුරාධපුරයේ පළමු රජු කවුද?", 
          answer: ["Pandukabhaya", "පණ්ඩුකාභය", "pandukabaya"], 
          options: [
              { en: "Devanampiyatissa", si: "දේවානම්පියතිස්ස" },
              { en: "Dutugemunu", si: "දුටුගැමුණු" },
              { en: "Pandukabhaya", si: "පණ්ඩුකාභය" },
              { en: "Vijaya", si: "විජය" }
          ], 
          image: "https://placehold.co/400x300/33FF57/333?text=King+Pandukabhaya" 
      },
      { 
          question: "Who built the Sigiriya rock fortress? / සීගිරිය බලකොටුව ගොඩනැගුවේ කවුද?", 
          answer: ["Kashyapa", "කාශ්‍යප", "kashyapa"], 
          options: [
              { en: "Parakramabahu", si: "පරාක්‍රමබාහු" },
              { en: "Kashyapa", si: "කාශ්‍යප" },
              { en: "Dhatusena", si: "ධාතුසේන" },
              { en: "Moggallana", si: "මුගලන්" }
          ], 
          image: "https://placehold.co/400x300/3357FF/333?text=King+Kashyapa" 
      },
      { 
          question: "Which country ruled Sri Lanka last? / ශ්‍රී ලංකාව අවසන් වරට පාලනය කළේ කුමන රටද?", 
          answer: ["British", "බ්‍රිතාන්‍ය", "brithanya", "england"], 
          options: [
              { en: "Portuguese", si: "පෘතුගීසි" },
              { en: "Dutch", si: "ලන්දේසි" },
              { en: "British", si: "බ්‍රිතාන්‍ය" },
              { en: "French", si: "ප්‍රංශ" }
          ], 
          image: "https://placehold.co/400x300/FF33A1/333?text=British+Rule" 
      },
      { 
          question: "In what year did Ceylon become 'Sri Lanka'? / 'ලංකාව' 'ශ්‍රී ලංකා' බවට පත් වූයේ කුමන වසරේද?", 
          answer: ["1972"], 
          options: [
              { en: "1948", si: "1948" },
              { en: "1956", si: "1956" },
              { en: "1972", si: "1972" },
              { en: "1978", si: "1978" }
          ], 
          image: "https://placehold.co/400x300/F3FF33/333?text=Republic+1972" 
      },
      { 
          question: "Who is known as 'The Father of the Nation'? / 'ජාතියේ පියා' ලෙස හඳුන්වන්නේ කවුද?", 
          answer: ["D.S. Senanayake", "ඩී.එස්. සේනානායක", "ds senanayake"], 
          options: [
              { en: "S.W.R.D. Bandaranaike", si: "එස්.ඩබ්.ආර්.ඩී. බණ්ඩාරනායක" },
              { en: "Sir John Kotelawala", si: "ශ්‍රීමත් ජෝන් කොතලාවල" },
              { en: "D.S. Senanayake", si: "ඩී.එස්. සේනානායක" },
              { en: "J.R. Jayewardene", si: "ජේ.ආර්. ජයවර්ධන" }
          ], 
          image: "https://placehold.co/400x300/33FFF6/333?text=D.S.+Senanayake" 
      },
      { 
          question: "Which king built the Ruwanwelisaya? / රුවන්වැලිසෑය ගොඩනැගුවේ කුමන රජුද?", 
          answer: ["Dutugemunu", "දුටුගැමුණු", "dutugemunu", "dutu gemunu"], 
          options: [
              { en: "Dutugemunu", si: "දුටුගැමුණු" },
              { en: "Walagamba", si: "වළගම්බා" },
              { en: "Mahasen", si: "මහසෙන්" },
              { en: "Parakramabahu", si: "පරාක්‍රමබාහු" }
          ], 
          image: "https://placehold.co/400x300/8E33FF/333?text=King+Dutugemunu" 
      },
      { 
          question: "What is the ancient name for Sri Lanka? / ශ්‍රී ලංකාවේ පැරණි නම කුමක්ද?", 
          answer: ["Ceylon", "Taprobane", "Serendib", "සිලෝන්", "ceylon", "තප්‍රොබේන්", "සෙරන්ඩිබ්"], 
          options: [
              { en: "Maldives", si: "මාලදිවයින" },
              { en: "Madagascar", si: "මැඩගස්කරය" },
              { en: "Ceylon", si: "සිලෝන්" },
              { en: "Mauritius", si: "මුරුසිය" }
          ], 
          image: "https://placehold.co/400x300/FF8E33/333?text=Old+Map+Ceylon" 
      },
      { 
          question: "Which kingdom was the last native kingdom? / අවසන් සිංහල රාජධානිය කුමක්ද?", 
          answer: ["Kandy", "මහනුවර", "mahanuwara", "kandyan kingdom"], 
          options: [
              { en: "Anuradhapura", si: "අනුරාධපුර" },
              { en: "Polonnaruwa", si: "පොළොන්නරුව" },
              { en: "Kotte", si: "කෝට්ටේ" },
              { en: "Kandy", si: "මහනුවර" }
          ], 
          image: "https://placehold.co/400x300/33FFB5/333?text=Kandy+Kingdom" 
      },
      { 
          question: "When did the 30-year civil war end? / වසර 30ක සිවිල් යුද්ධය අවසන් වූයේ කවදාද?", 
          answer: ["2009"], 
          options: [
              { en: "1999", si: "1999" },
              { en: "2001", si: "2001" },
              { en: "2005", si: "2005" },
              { en: "2009", si: "2009" }
          ], 
          image: "https://placehold.co/400x300/B533FF/333?text=Peace+2009" 
      }
    ]
  },
  {
    // --- LEVEL 4 ---
    levelName: "Level 4: Culture & Sports / 4 වන අදියර: සංස්කෘතිය සහ ක්‍රීඩා",
    questions: [
      { 
          question: "What is the national sport of Sri Lanka? / ශ්‍රී ලංකාවේ ජාතික ක්‍රීඩාව කුමක්ද?", 
          answer: ["Volleyball", "වොලිබෝල්", "volleyball"], 
          options: [
              { en: "Cricket", si: "ක්‍රිකට්" },
              { en: "Volleyball", si: "වොලිබෝල්" },
              { en: "Badminton", si: "බැඩ්මින්ටන්" },
              { en: "Elle", si: "එල්ලේ" }
          ], 
          image: "https://placehold.co/400x300/FFC300/333?text=Volleyball" 
      },
      { 
          question: "In what year did Sri Lanka win the Cricket World Cup? / ශ්‍රී ලංකාව ක්‍රිකට් ලෝක කුසලානය දිනූ වසර?", 
          answer: ["1996"], 
          options: [
              { en: "1992", si: "1992" },
              { en: "1996", si: "1996" },
              { en: "1999", si: "1999" },
              { en: "2011", si: "2011" }
          ], 
          image: "https://placehold.co/400x300/00AFFF/333?text=Cricket+World+Cup+1996" 
      },
      { 
          question: "What is the main festival in Kandy? / මහනුවර ප්‍රධාන උත්සවය කුමක්ද?", 
          answer: ["Esala Perahera", "ඇසළ පෙරහැර", "esala perahera", "dala perahera"], 
          options: [
              { en: "Vesak", si: "වෙසක්" },
              { en: "Thai Pongal", si: "තෛපොංගල්" },
              { en: "Esala Perahera", si: "ඇසළ පෙරහැර" },
              { en: "New Year", si: "අලුත් අවුරුද්ද" }
          ], 
          image: "https://placehold.co/400x300/FF00FF/333?text=Kandy+Perahera" 
      },
      { 
          question: "Who is the highest wicket-taker in test cricket? / ටෙස්ට් ක්‍රිකට් වල වැඩිම කඩුලු ලාභියා?", 
          answer: ["Muttiah Muralitharan", "මුත්තයියා මුරලිදරන්", "murali", "මුරලි"], 
          options: [
              { en: "Shane Warne", si: "ෂේන් වෝන්" },
              { en: "Anil Kumble", si: "අනිල් කුම්බ්ලේ" },
              { en: "Muttiah Muralitharan", si: "මුත්තයියා මුරලිදරන්" },
              { en: "James Anderson", si: "ජේම්ස් ඇන්ඩර්සන්" }
          ], 
          image: "https://placehold.co/400x300/00FF00/333?text=Muttiah+Muralitharan" 
      },
      { 
          question: "What traditional art involves carving masks? / වෙස් මුහුණු කැටයම් කරන සාම්ප්‍රදායික කලාව?", 
          answer: ["Mask Making", "වෙස් මුහුණු", "wes muhunu"], 
          options: [
              { en: "Pottery", si: "මැටි කර්මාන්තය" },
              { en: "Batik", si: "බාතික්" },
              { en: "Mask Making", si: "වෙස් මුහුණු" },
              { en: "Lacquerwork", si: "ලාක්ෂා" }
          ], 
          image: "https://placehold.co/400x300/FF5733/333?text=Traditional+Masks" 
      },
      { 
          question: "What is the Sinhala and Tamil New Year called? / සිංහල සහ දෙමළ අලුත් අවුරුද්ද?", 
          answer: ["Avurudu", "අවුරුදු", "avurudu"], 
          options: [
              { en: "Vesak", si: "වෙසක්" },
              { en: "Avurudu", si: "අවුරුදු" },
              { en: "Deepavali", si: "දීපාවලි" },
              { en: "Christmas", si: "නත්තල" }
          ], 
          image: "https://placehold.co/400x300/33FF57/333?text=Avurudu" 
      },
      { 
          question: "Who won Sri Lanka's first Olympic medal? / ශ්‍රී ලංකාවේ පළමු ඔලිම්පික් පදක්කම දිනුවේ කවුද?", 
          answer: ["Duncan White", "ඩන්කන් වයිට්", "duncan white"], 
          options: [
              { en: "Susanthika Jayasinghe", si: "සුසන්තිකා ජයසිංහ" },
              { en: "Duncan White", si: "ඩන්කන් වයිට්" },
              { en: "Arjuna Ranatunga", si: "අර්ජුන රණතුංග" },
              { en: "Jayanthi Kuru-Utumpala", si: "ජයන්ති කුරු-උතුම්පාල" }
          ], 
          image: "https://placehold.co/400x300/3357FF/333?text=Duncan+White" 
      },
      { 
          question: "What is the main ingredient in 'Kottu'? / 'කොත්තු' වල ප්‍රධාන අමුද්‍රව්‍යය කුමක්ද?", 
          answer: ["Roti", "රොටී", "roti", "godamba roti"], 
          options: [
              { en: "Rice", si: "බත්" },
              { en: "Noodles", si: "නූඩ්ල්ස්" },
              { en: "Roti", si: "රොටී" },
              { en: "Bread", si: "පාන්" }
          ], 
          image: "https://placehold.co/400x300/FF33A1/333?text=Kottu+Roti" 
      },
      { 
          question: "What is the traditional dance form of Kandy? / මහනුවර සාම්ප්‍රදායික නර්තන ක්‍රමය?", 
          answer: ["Kandyan Dance", "උඩරට නැටුම්", "udarata natum"], 
          options: [
              { en: "Pahatharata", si: "පහත රට" },
              { en: "Sabaragamuwa", si: "සබරගමු" },
              { en: "Kandyan Dance", si: "උඩරට නැටුම්" },
              { en: "Bharatanatyam", si: "භරත" }
          ], 
          image: "https://placehold.co/400x300/F3FF33/333?text=Kandyan+Dance" 
      },
      { 
          question: "Who is the Sri Lankan cricketer nicknamed 'Master Blaster'? / 'මාස්ටර් බ්ලාස්ටර්' යන අන්වර්ථ නාමයෙන් හඳුන්වන ක්‍රිකට් ක්‍රීඩකයා?", 
          answer: ["Sanath Jayasuriya", "සනත් ජයසූරිය", "sanath jayasuriya", "sanath"], 
          options: [
              { en: "Aravinda de Silva", si: "අරවින්ද ද සිල්වා" },
              { en: "Sanath Jayasuriya", si: "සනත් ජයසූරිය" },
              { en: "Kumar Sangakkara", si: "කුමාර් සංගක්කාර" },
              { en: "Mahela Jayawardene", si: "මහේල ජයවර්ධන" }
          ], 
          image: "https://placehold.co/400x300/33FFF6/333?text=Sanath+Jayasuriya" 
      }
    ]
  },
  {
    // --- LEVEL 5 ---
    levelName: "Level 5: General Knowledge / 5 වන අදියර: සාමාන්‍ය දැනුම",
    questions: [
      { 
          question: "What is the main currency of Sri Lanka? / ශ්‍රී ලංකාවේ ප්‍රධාන මුදල් ඒකකය?", 
          answer: ["Rupee", "රුපියල්", "rupiyal", "rupees"], 
          options: [
              { en: "Dollar", si: "ඩොලර්" },
              { en: "Rupee", si: "රුපියල්" },
              { en: "Riyal", si: "රියාල්" },
              { en: "Taka", si: "ටාකා" }
          ], 
          image: "https://placehold.co/400x300/FFBD33/333?text=Sri+Lankan+Rupee" 
      },
      { 
          question: "What is the capital city of Sri Lanka? / ශ්‍රී ලංකාවේ අගනුවර කුමක්ද?", 
          answer: ["Sri Jayawardenepura Kotte", "ශ්‍රී ජයවර්ධනපුර කෝට්ටේ", "kotte", "කෝට්ටේ"], 
          options: [
              { en: "Colombo", si: "කොළඹ" },
              { en: "Kandy", si: "මහනුවර" },
              { en: "Galle", si: "ගාල්ල" },
              { en: "Sri Jayawardenepura Kotte", si: "ශ්‍රී ජයවර්ධනපුර කෝට්ටේ" }
          ], 
          image: "https://placehold.co/400x300/33FFBD/333?text=Parliament+Kotte" 
      },
      { 
          question: "What are the three colors of the Sri Lankan flag? / ශ්‍රී ලංකා ජාතික කොඩියේ වර්ණ 3?", 
          answer: ["Lion", "Orange Green Maroon", "තැඹිලි කොළ මෙරූන්", "orange green maroon"], 
          options: [
              { en: "Red, White, Blue", si: "රතු, සුදු, නිල්" },
              { en: "Orange, Green, Maroon", si: "තැඹිලි, කොළ, මෙරූන්" },
              { en: "Yellow, Red, Green", si: "කහ, රතු, කොළ" },
              { en: "Blue, Yellow, White", si: "නිල්, කහ, සුදු" }
          ], 
          image: "https://placehold.co/400x300/FF5733/333?text=Sri+Lankan+Flag" 
      },
      { 
          question: "What is the longest river in Sri Lanka? / ශ්‍රී ලංකාවේ දිගම ගඟ?", 
          answer: ["Mahaweli", "මහවැලි", "mahaweli"], 
          options: [
              { en: "Kelani", si: "කැළණි" },
              { en: "Kalu", si: "කළු" },
              { en: "Mahaweli", si: "මහවැලි" },
              { en: "Walawe", si: "වලවේ" }
          ], 
          image: "https://placehold.co/400x300/33A1FF/333?text=Mahaweli+River" 
      },
      { 
          question: "What is the main export crop? / ප්‍රධාන අපනයන බෝගය කුමක්ද?", 
          answer: ["Tea", "තේ", "the", "ceylon tea"], 
          options: [
              { en: "Tea", si: "තේ" },
              { en: "Rubber", si: "රබර්" },
              { en: "Coconut", si: "පොල්" },
              { en: "Cinnamon", si: "කුරුඳු" }
          ], 
          image: "https://placehold.co/400x300/33FF57/333?text=Tea+Plantation" 
      },
      { 
          question: "Which Sri Lankan woman climbed Mount Everest? / එවරස්ට් කන්ද නැගි ශ්‍රී ලාංකික කාන්තාව?", 
          answer: ["Jayanthi Kuru-Utumpala", "ජයන්ති කුරු-උතුම්පාල", "jayanthi"], 
          options: [
              { en: "Susanthika Jayasinghe", si: "සුසන්තිකා ජයසිංහ" },
              { en: "Sirimavo Bandaranaike", si: "සිරිමාවෝ බණ්ඩාරනායක" },
              { en: "Jayanthi Kuru-Utumpala", si: "ජයන්ති කුරු-උතුම්පාල" },
              { en: "Chandrika Kumaratunga", si: "චන්ද්‍රිකා කුමාරතුංග" }
          ], 
          image: "https://placehold.co/400x300/F3FF33/333?text=Mount+Everest" 
      },
      { 
          question: "What is the name of Colombo's international airport? / කොළඹ ජාත්‍යන්තර ගුවන්තොටුපළේ නම?", 
          answer: ["Bandaranaike", "BIA", "බණ්ඩාරනායක", "katunayake"], 
          options: [
              { en: "Rajapaksa (Mattala)", si: "රාජපක්ෂ (මත්තල)" },
              { en: "Bandaranaike (Katunayake)", si: "බණ්ඩාරනායක (කටුනායක)" },
              { en: "Ratmalana", si: "රත්මලාන" },
              { en: "Koggala", si: "කොග්ගල" }
          ], 
          image: "https://placehold.co/400x300/FF8E33/333?text=BIA+Airport" 
      },
      { 
          question: "What is the 'Lotus Tower' known for? / 'නෙළුම් කුළුණ' ප්‍රසිද්ධ කුමකටද?", 
          answer: ["Tallest Tower", "උසම කුළුණ", "communication tower"], 
          options: [
              { en: "Tallest Tower (S. Asia)", si: "උසම කුළුණ (දකුණු ආසියාව)" },
              { en: "Oldest Building", si: "පැරණිතම ගොඩනැගිල්ල" },
              { en: "Largest Hotel", si: "විශාලතම හෝටලය" },
              { en: "Main Temple", si: "ප්‍රධාන පන්සල" }
          ], 
          image: "https://placehold.co/400x300/33FFF6/333?text=Lotus+Tower" 
      },
      { 
          question: "What is 'Kurundu' in English? / 'කුරුඳු' ඉංග්‍රීසියෙන් හඳුන්වන්නේ කෙසේද?", 
          answer: ["Cinnamon", "cinnamon"], 
          options: [
              { en: "Pepper", si: "ගම්මිරිස්" },
              { en: "Cinnamon", si: "කුරුඳු" },
              { en: "Cardamom", si: "කරදමුංගු" },
              { en: "Cloves", si: "කරාබුනැටි" }
          ], 
          image: "https://placehold.co/400x300/B533FF/333?text=Cinnamon" 
      },
      { 
          question: "Who was the world's first female Prime Minister? / ලොව පළමු අගමැතිනිය කවුද?", 
          answer: ["Sirimavo Bandaranaike", "සිරිමාවෝ බණ්ඩාරනායක", "sirimavo"], 
          options: [
              { en: "Chandrika Kumaratunga", si: "චන්ද්‍රිකා කුමාරතුංග" },
              { en: "Indira Gandhi", si: "ඉන්දිරා ගාන්ධි" },
              { en: "Margaret Thatcher", si: "මාග්‍රට් තැචර්" },
              { en: "Sirimavo Bandaranaike", si: "සිරිමාවෝ බණ්ඩාරනායක" }
          ], 
          image: "https://placehold.co/400x300/FF33A1/333?text=Sirimavo+Bandaranaike" 
      }
    ]
  }
];