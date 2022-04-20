import {
    IAppAccessors,
    IConfigurationExtend,
    ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { WelcomeCommand } from './commands/WelcomeCommand'

export class CommunityAppsWelcomeApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }
    protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
                
        // SlashCommands:
        await configuration.slashCommands.provideSlashCommand(new WelcomeCommand(this));
   }   
}
