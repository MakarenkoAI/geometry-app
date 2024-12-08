import { ScHelper, ScAddr, ScTemplate, ScType, ScEventType } from 'ts-sc-client';
import { ScConstruction, ScLinkContent, ScLinkContentType, ScEventSubscriptionParams } from "ts-sc-client";
import { client } from '../client';

const nrel_result = "nrel_result";
const action_finished = "action_finished";
const test_helper = "test_helper";
const action_initiated = "action_initiated";
const action = "action";
const nrel_main_idtf = "nrel_main_idtf";
const lang_ru = "lang_ru";

const keynodes = [
    { id: lang_ru, type: ScType.ConstNodeClass },
    { id: nrel_result, type: ScType.ConstNodeNonRole },
    { id: nrel_main_idtf, type: ScType.ConstNodeNonRole },
    { id: action, type: ScType.ConstNodeClass },
    { id: action_finished, type: ScType.ConstNodeClass },
    { id: action_initiated, type: ScType.ConstNodeClass },
    { id: test_helper, type: ScType.ConstNodeClass },
];

const createAction = async (actionClass, argument, keys) => {
    const actionAlias = "_action";

    const parameters = [
        { id: actionClass, type: ScType.ConstNodeClass },
        { id: argument, type: ScType.ConstNode },
    ];
    let inputKeys = await client.resolveKeynodes(parameters);

    const construction = new ScConstruction();

    construction.generateNode(ScType.ConstNode, actionAlias);
    construction.generateConnector(ScType.ConstPermPosArc, keys[action], actionAlias);
    construction.generateConnector(ScType.ConstPermPosArc, inputKeys[actionClass], actionAlias);
    construction.generateConnector(ScType.ConstPermPosArc, actionAlias, inputKeys[argument]);

    const result = await client.generateElements(construction);

    return result[0];
}

export const callSearchAgent = async (actionClass, argument, keyword) => {
    let keys = await client.resolveKeynodes(keynodes);
    const action = await createAction(actionClass, argument, keys);
    let str = `Найденные ${keyword}: `;

    const onActionFinished = (_subscibedAddr: ScAddr, _arc: ScAddr, anotherAddr: ScAddr, eventId: number) => {
        if (anotherAddr.isValid() && anotherAddr.equal(keys[action_finished])) {
            client.destroyElementaryEventSubscriptions(eventId);
        }
    };
    const eventParams = new ScEventSubscriptionParams(action, ScEventType.AfterGenerateIncomingArc, onActionFinished);

    await client.createElementaryEventSubscriptions(eventParams);

    const construction = new ScConstruction();
    construction.generateConnector(ScType.ConstPermPosArc, keys[action_initiated], action);
    await client.generateElements(construction);

    let helper = new ScHelper(client);
    const resultAddr = await helper.getResult(action);

    if (resultAddr.isValid()) {
        const nodeAlias = "_node";
        const template = new ScTemplate();
        template.triple(
            resultAddr,
            ScType.VarPermPosArc,
            nodeAlias,
        );
        const r = await client.searchByTemplate(template);
        console.log("answer");
        console.log(r);

        let symbol = ', ';
        let addition = '';
        for (let i = 0; i < r.length; i++) {
            if (i == r.length - 1) { symbol = '.' };
            let rez = await helper.getMainIdentifier(r[i].get(nodeAlias), "lang_ru");
            let rezLink = await client.getLinkContents([r[i].get(nodeAlias)]);
            if (rez) {
                addition += rez + symbol;
            }
            if (rezLink[0].data) {
                addition += rezLink[0].data + symbol;
            }
        }
        if (!addition.length) {
            return "Я не знаю ответ на данный вопрос.";
        }
        str += addition;
    }
    return str;
};
