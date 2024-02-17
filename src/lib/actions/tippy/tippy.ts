import tippy, { type ExtendedProps, hideOnEsc, hideOnPopperBlur, hideOthersOnOpen } from './tippy-plugins';
import 'tippy.js/dist/tippy.css';

// Partial<Props> 可以让 Props 的所有属性都变成可选的
export default function (node: HTMLElement, options?: Partial<ExtendedProps>) {
	const plugins = [hideOnEsc, hideOnPopperBlur, hideOthersOnOpen];
	const _options = options ? { ...options, plugins } : { plugins };
	const instance = tippy(node, _options);
	return {
		update(newOptions: ExtendedProps) {
			const _newOptions = newOptions ? { ...newOptions, plugins } : { plugins };
			instance.setProps(_newOptions);
		},
		destroy() {
			instance.destroy();
		}
	};
}
