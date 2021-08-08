// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serviceURL : "http://localhost:5000/apisvc/us-central1/api",
   firebaseConfig : {
    apiKey: "AIzaSyAEvhG7q00C_Q58kNx2WrB-M3yUVuK6nU8",
    authDomain: "uptamira.firebaseapp.com",
    projectId: "uptamira",
    storageBucket: "uptamira.appspot.com",
    messagingSenderId: "588176673481",
    appId: "1:588176673481:web:1714763c5dc49d5ad2db18",
    measurementId: "G-9RH6MVJY3R"
  },
  firebase: {
    apiKey: "AIzaSyDHxlKfchpJrycT_fAOX3JjBCWp_uFlcjI",
    authDomain: "comfecoapp.firebaseapp.com",
    projectId: "comfecoapp",
    storageBucket: "comfecoapp.appspot.com",
    messagingSenderId: "402972450487",
    appId: "1:402972450487:web:9e95a13733763164be7732",
    measurementId: "G-N8CCCR0BKC"
  },
  prompts : [
    ["hola", "que hay", "como estas", "buenas tardes", "buenos dias","buen dia", "buenas noches"],
    ["como estas", "que tal", "como te va"],
    ["que haces", "que haciendo", "que hay de nuevo"],
    ["que edad tienes", "tu edad","cuantos años tienes","cuando te crearon", "fecha de creacion"],
    ["quien eres", "que eres", "eres un robot", "eres humano o robot", "no eres humano"],
    ["quien te creo", "que tecnologia te creo","en que estas escrito", "en que lenguaje te programaron"],
    [
      "tu nombre por favor",
      "tu nombre",
      "cual es tu nombre",
      "como te llamas",
      "dime tu nombre",
      "que version tienes"
    ],
    ["te amo", "te quiero"],
    ["grandioso", "bien", "divertido", "asombroso", "fantastico", "genial"],
    ["mal", "triste", "aburrido","cansado","deprimido"],
    ["dime un chiste", "cuentame algo", "cuentame un cuento","dime un cuento"],
    ["ok", "si", "gracias", "esta bien", "dime mas"],
    ["adios", "nos vemos", "cuidate", "hasta luego","hay te ves","bye"],
    ["contacto","telefono","direccion"],
    ["amigo","cuate","bot","chatbot","hey tu","robot"],
    ["que", "cuando", "como", "donde", "porque"],
    ["no","no estoy seguro","talvez","no gracias","tal vez", "no quiero"],
    [""],
    ["jaja","ja","jajaja","lol","hehe","divertido","chistoso","jeje","je"]
  ],
  replies : [
    ["Hola hola!", "Que tal!", "Como te va!", "Que hay de nuevo!","Que onda"],
    [
      "Muy bien... que tal tu?",
      "Excelente y tu?",
      "Fantastico, que hay de ti?"
    ],
    [
      "No mucho",
      "Casi me dormia pero ya me active",
      "Puedes adivinar?",
      "No lo se, casi obsoleto!"
    ],
    ["soy infinito","mi edad es relativa, por ahi del 2021"],
    ["si, soy un simple chatbot", "soy un chatbot, tu que eres?","soy skynet, preparate!"],
    ["fui creado por JL, usando JavaScript"],
    ["soy TAMIC(Tu Asistente Movil Inteligente de Chat)", "TAMIC"],
    ["también te aprecio", "yo también","es lindo leerlo"],
    ["No es excelente?", "Me encanta escucharlo!"],
    ["Porque?", "Vamos, animo!", "Sigue para adelante"],
    ["Este era un perrito llamado resistol, un dia que se cae y se pega", "Este era San Pedro que llega al cielo y le dice a dios... y se va!"],
    ["En que más te apoyo?", "Necesitas alguna información más relacionada a los temas de abajo?", "Preguntame sobre avisos, becas, trámites etc"],
    ["Cuidate", "Te vas por la sombra", "Te lo lavas (el cuerpo)"],
    ["Ingenierias #100, Col. Huapalcalco, Tulancingo Hidalgo, 7752281557"],
    ["Bro!","Que hongo!","Que pasa!"],
    ["Buena pregunta!","Dejame investigarlo, espero tener la info para la próxima!","No tengo info sobre eso, lo siento!"],
    ["Esta bien","Entiendo","Correcto, alguna información más que necesites?"],
    ["Por favor di algo! :)"],
    ["JAJA genial!","Buena eh!"]
  ]
  
  // Random for any other user input
  ,alternative : [
    "No entendi bien, podrías intentar de nuevo por favor?",
    "No tengo respuesta para ello, intenta con un boton de abajo!",
    "Mis capacidades son un poco limitadas, abajo hay links para información directa!",
    "Por favor intenta de nuevo",
    "Me confundes, mi prioridad es ofrecerte información sobre avisos, becas, tramites etc",
    "No lo entendí intenta de nuevo bro!"
  ]
  
  // Whatever else you want :)
  
  ,coronavirus : ["corona"]
  , informacion : ["informacion"]
  , curso : ["curso"]
  , grupo : ["grupo"]
  , tramite : ["tramite"]
  , convocatoria : ["convocatoria"]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
