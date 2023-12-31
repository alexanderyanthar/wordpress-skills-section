import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { __ } from "@wordpress/i18n";

export default function SortableItem(props) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<li
			className="wp-block-skill-section-list-item"
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			{props.icon.src && (
				<>
					<img src={props.icon.src} style={{ width: "50px" }} />
					<p style={{ fontSize: "14px" }}>{props.icon.name}</p>
				</>
			)}
		</li>
	);
}
