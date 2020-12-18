import { QuerySettingsItem } from './query-settings-item';

export class TodoItemNode extends QuerySettingsItem {
	children: TodoItemNode[];
	value: string;
}