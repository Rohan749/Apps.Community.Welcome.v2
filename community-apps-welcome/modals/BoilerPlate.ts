import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { TextObjectType } from '@rocket.chat/apps-engine/definition/uikit/blocks';
import { IUIKitModalViewParam } from '@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder';
import { IUser } from '@rocket.chat/apps-engine/definition/users';
import { AppEnum } from '../enum/App';
import { AppLinksEnum } from '../enum/AppLinks';
import { BlocksEnum } from '../enum/Blocks';
import { BoilerplateEnum } from '../enum/Boilerplate';
import { HeadingEnum } from '../enum/Heading';
import { LinkEnum } from '../enum/Links';
import { StepsEnum } from '../enum/Steps';

export async function boilerplateModal({ modify, read, user }: { modify: IModify, read: IRead, user: IUser }): Promise<IUIKitModalViewParam> {
	const viewId = BoilerplateEnum.VIEW_ID;

	const block = modify.getCreator().getBlockBuilder();
	block.addSectionBlock({ text: block.newMarkdownTextObject(HeadingEnum.SELECT_TEXT) });
	block.addSectionBlock({ text: block.newMarkdownTextObject(LinkEnum.SELECT_TEXT) });
	block.addSectionBlock({ text: block.newMarkdownTextObject(StepsEnum.SELECT_TEXT) });
	block.addSectionBlock({ text: block.newMarkdownTextObject(AppLinksEnum.SELECT_TEXT) })


	return {
		id: viewId,
		title: {
			type: TextObjectType.PLAINTEXT,
			text: AppEnum.DEFAULT_TITLE,
			
		},
		
        submit: block.newButtonElement({
            text: {
                type: TextObjectType.PLAINTEXT,
                text: BlocksEnum.SAVE,
            },
        }),
		blocks: block.getBlocks(),
	};
}
