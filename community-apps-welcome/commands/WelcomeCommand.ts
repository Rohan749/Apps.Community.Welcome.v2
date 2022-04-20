import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { ErrorsEnum } from '../enum/Errors';
import { notifyUser } from "../lib/message";
import { modalCommand } from './ModalCommand';
import { CommunityAppsWelcomeApp } from '../CommunityAppsWelcomeApp';


export class WelcomeCommand implements ISlashCommand {
    public command = 'guide-me';
    public i18nParamsExample = 'Params';
    public i18nDescription = 'Description';
    public providesPreview = false;

    constructor(private readonly app: CommunityAppsWelcomeApp) { }
    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persistence: IPersistence): Promise<void> {
        try {
            await modalCommand.run({ app: this.app, context, read, modify });

        }catch (error) {
            await notifyUser({ app: this.app, read, modify, room: context.getRoom(), user: context.getSender(), text: error.message || ErrorsEnum.OPERATION_FAILED });
            this.app.getLogger().error(error.message);
        }
    }
}
