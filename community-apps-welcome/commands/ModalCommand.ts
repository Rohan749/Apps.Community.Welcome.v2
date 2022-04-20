import { IModify, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import { CommunityAppsWelcomeApp } from "../CommunityAppsWelcomeApp";
import { boilerplateModal } from '../modals/BoilerPlate'

class ModalCommand {
    public async run({ app, context, read, modify }: 
        { 
            app: CommunityAppsWelcomeApp, 
            context: SlashCommandContext, 
            read: IRead, 
            modify: IModify 
        }): Promise<void> {
        const triggerId = context.getTriggerId();
        if (triggerId) {
            try {
                const modal = await boilerplateModal({ read, modify, user: context.getSender() });
                await modify.getUiController().openModalView(modal, { triggerId }, context.getSender());
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export const modalCommand = new ModalCommand();
