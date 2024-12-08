/*import { ScAddr, ScTemplate, ScType } from 'ts-sc-client';
import { client } from '../client';

const concept = 'concept_set';
const rrelation = 'rrel_key_sc_element';

const baseKeynodes = [
    { id: concept, type: ScType.NodeConstClass },
    { id: rrelation, type: ScType.NodeConstRole },
];

const findNode = async (user: string) => {
    const keynodes = await client.resolveKeynodes(baseKeynodes);
    return keynodes;
};

export const exampleAgent = async () => {
    const userNode = await client.getUser();
    const user = client.getLinkContents([userNode]);
    return user;
};*/