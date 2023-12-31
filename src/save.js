import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export default function save({ attributes }) {
	const { skillTitle, selectedIcons } = attributes;
	return (
		<div {...useBlockProps.save()}>
			<RichText.Content
				tagName="h2"
				value={skillTitle || __("Skills", "skills-section")}
			/>
			{selectedIcons.length > 0 && (
				<ul className="wp-block-skills-section-list">
					{selectedIcons.map((icon) => (
						<li
							className="wp-block-skills-section-list-item"
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								marginRight: "16px",
							}}
							key={icon.name}
						>
							<img src={icon.src} alt={icon.name} />
							<p>{icon.name}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
