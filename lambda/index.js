/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
    en: {
        translation: {
            WELCOME_MESSAGE: 'Hello, thank you for using Messi Facts, to get started you can say: ',
            HELLO_MESSAGE: 'Hello World!',
            HELP_MESSAGE: 'How can I help you? To request a fun fact about Messi you can say: ',
            GOODBYE_MESSAGE: 'Goodbye!',
            REFLECTOR_MESSAGE: 'You just triggered %s',
            FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again.',
            ERROR_MESSAGE: 'Sorry, there was an error. Please try again.',
            RANDOM_PHRASES: 'tell me a fact about Messi... give me a Messi fact... I want to know about Messi...',
            END_MESSAGE_WELCOME: '.. or if you want to stop me just say, Cancel!... so... Do you want to start?',
            END_MESSAGE_HELP: '.. or if you want to stop me just say, Cancel!... so... How can I help you?',
            GET_FACT_MESSAGE: 'A fun fact about Messi is: ',
            FACTS: [
                "Messi has won the Ballon d'Or seven times.",
                "Messi has spent over 20 years at FC Barcelona.",
                "Messi scored over 700 goals in his professional career.",
                "Messi won the FIFA World Cup with Argentina in 2022.",
                "Messi holds the record for most goals in a calendar year.",
                "Messi won the Champions League four times with Barcelona.",
                "Messi has more than 300 assists in his career.",
                "Messi joined Paris Saint-Germain in 2021."
            ]
        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: 'Hola, gracias por usar Datos sobre Messi, para comenzar puedes decir: ',
            HELLO_MESSAGE: '¡Hola Mundo!',
            HELP_MESSAGE: '¿Cómo te puedo ayudar? Para pedir un dato curioso sobre Messi puedes decir: ',
            GOODBYE_MESSAGE: '¡Adiós!',
            REFLECTOR_MESSAGE: 'Acabas de activar %s',
            FALLBACK_MESSAGE: 'Lo siento, no sé nada sobre eso. Por favor inténtalo otra vez.',
            ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez.',
            RANDOM_PHRASES: 'dime un dato sobre Messi... cuéntame algo sobre Messi... quiero saber sobre Messi...',
            END_MESSAGE_WELCOME: '.. o si deseas detenerme solo di, !Cancela!... entonces... ¿Quieres comenzar?',
            END_MESSAGE_HELP: '.. o si deseas detenerme solo di, !Cancela!... entonces... ¿Como te puedo ayudar?',
            GET_FACT_MESSAGE: 'Un dato curioso sobre Messi es: ',
            FACTS: [
                "Messi ha ganado el Balón de Oro siete veces.",
                "Messi ha pasado más de 20 años en el FC Barcelona.",
                "Messi ha marcado más de 700 goles en su carrera profesional.",
                "Messi ganó la Copa Mundial de la FIFA con Argentina en 2022.",
                "Messi tiene el récord de más goles en un año calendario.",
                "Messi ganó la Liga de Campeones cuatro veces con el Barcelona.",
                "Messi tiene más de 300 asistencias en su carrera.",
                "Messi se unió al Paris Saint-Germain en 2021."
            ]
        }
    }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = attributes.t('WELCOME_MESSAGE') + attributes.t('RANDOM_PHRASES') + attributes.t('END_MESSAGE_WELCOME');
        const repromptOutput = attributes.t('RANDOM_PHRASES') + attributes.t('END_MESSAGE_WELCOME');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = attributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = attributes.t('HELP_MESSAGE') + attributes.t('RANDOM_PHRASES') + attributes.t('END_MESSAGE_HELP');
        const repromptOutput = attributes.t('RANDOM_PHRASES') + attributes.t('END_MESSAGE_HELP');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = attributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = attributes.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const GetMessiFactIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetMessiFactIntent';
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        const facts = attributes.t('FACTS');
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        const speakOutput = attributes.t('GET_FACT_MESSAGE') + randomFact;
        const repromptOutput = attributes.t('RANDOM_PHRASES') + attributes.t('END_MESSAGE_WELCOME');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = attributes.t('REFLECTOR_MESSAGE', intentName);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = attributes.t('ERROR_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};
// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};
// This request interceptor will bind a translation function 't' to the requestAttributes.

const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            fallbackLng: 'en',
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: languageStrings,
            returnObjects: true
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) {
            return localizationClient.t(...args);
        }
    }
}
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        GetMessiFactIntentHandler,
        IntentReflectorHandler)
    .addErrorHandlers(ErrorHandler)
    .addRequestInterceptors(LocalizationInterceptor, LoggingRequestInterceptor)
    .addResponseInterceptors(LoggingResponseInterceptor)
    .withCustomUserAgent('sample/messi-facts/v1.0')
    .lambda();
