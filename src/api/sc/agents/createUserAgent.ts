import { ScType } from 'ts-sc-client';
import { ScConstruction, ScLinkContent, ScLinkContentType, ScEventSubscriptionParams } from "ts-sc-client";
import { client } from '../client';

const user = "user";
const number = "number";
const nrel_grade = "nrel_grade";
const nrel_main_idtf = "nrel_main_idtf";

const keynodes = [
    { id: user, type: ScType.ConstNodeClass },
    { id: number, type: ScType.ConstNodeClass },
    { id: nrel_grade, type: ScType.ConstNodeNonRole },
    { id: nrel_main_idtf, type: ScType.ConstNodeNonRole },
];

export const createUserAgent = async (userName, userGrade) => {
    console.log(userName, userGrade);
    let keys = await client.resolveKeynodes(keynodes);

    const nameAlias = "_name";
    const nameNodeAlias = "_nameNode";
    const arcNameAlias = "_arcName";
    const gradeAlias = "_grade";
    const gradeNodeAlias = "_gradeNode";
    const arcGradeAlias = "_arcGrade";
    const arcAlias = "_arc";

    const construction = new ScConstruction();
    construction.generateNode(ScType.ConstNode, nameNodeAlias);
    construction.generateLink(ScType.ConstNodeLink, new ScLinkContent(userName, ScLinkContentType.String), nameAlias);
    construction.generateConnector(ScType.ConstCommonArc, nameNodeAlias, nameAlias, arcNameAlias);
    construction.generateConnector(ScType.ConstPermPosArc, keys[nrel_main_idtf], arcNameAlias);
    construction.generateConnector(ScType.ConstPermPosArc, keys[user], nameNodeAlias);

    construction.generateNode(ScType.ConstNode, gradeNodeAlias);
    construction.generateLink(ScType.ConstNodeLink, new ScLinkContent(String(userGrade), ScLinkContentType.String), gradeAlias);
    construction.generateConnector(ScType.ConstCommonArc, gradeNodeAlias, gradeAlias, arcGradeAlias);
    construction.generateConnector(ScType.ConstPermPosArc, keys[nrel_main_idtf], arcGradeAlias);
    construction.generateConnector(ScType.ConstPermPosArc, keys[number], gradeNodeAlias);

    construction.generateConnector(ScType.ConstCommonArc, nameNodeAlias, gradeNodeAlias, arcAlias);
    construction.generateConnector(ScType.ConstPermPosArc, keys[nrel_grade], arcAlias);

    await client.generateElements(construction);
    return true;
};
