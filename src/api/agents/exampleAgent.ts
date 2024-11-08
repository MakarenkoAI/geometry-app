import { ScAddr, ScTemplate, ScType } from 'ts-sc-client';
import { client } from '../client';

const concept = 'concept_set';
const rrelation = 'rrel_key_sc_element';

const baseKeynodes = [
    { id: concept, type: ScType.NodeConstClass },
    { id: rrelation, type: ScType.NodeConstRole },
];

const findDialogNode = async (user: string) => {
    const keynodes = await client.resolveKeynodes(baseKeynodes);
    return keynodes;
};

export const exampleAgent = async (name) => {
    return await findDialogNode(name);
};