import { QuerySettingsItem } from './query-settings-item';

export class TodoItemFlatNode extends QuerySettingsItem {	
	value: string;
	level: number;
	expandable: boolean;
}