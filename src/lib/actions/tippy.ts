import tippy, { type Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

// Partial<Props> 可以让 Props 的所有属性都变成可选的
export default function (node: HTMLElement, options?: Partial<Props>) {
	const instance = tippy(node, options);
	return {
		update(newOptions: Props) {
			instance.setProps(newOptions);
		},
		destroy() {
			instance.destroy();
		}
	};
}
