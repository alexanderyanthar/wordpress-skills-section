import { __ } from "@wordpress/i18n";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { RichText } from "@wordpress/block-editor";
import { PanelBody, CheckboxControl } from "@wordpress/components";
import "./editor.scss";
import {
	FRONT_END_SKILLS,
	EXTRA_SKILLS,
	BACK_END_SKILLS,
} from "./constants/skills";

export default function Edit({ attributes, setAttributes }) {
	const { skillTitle, selectedIcons } = attributes;

	const onChangeSkillTitle = (newSkillTitle) => {
		setAttributes({ skillTitle: newSkillTitle });
	};

	const onIconChange = (newIcons) => {
		setAttributes({ selectedIcons: newIcons });
	};

	return (
		<>
			<div {...useBlockProps()}>
				<RichText
					placeholder={__("Skills", "skills-section")}
					tagName="h2"
					value={skillTitle || __("Skills", "skills-section")}
					onChange={onChangeSkillTitle}
					allowedFormats={[]}
				/>

				{selectedIcons.length > 0 && (
					<ul style={{ listStyle: "none", display: "flex" }}>
						{selectedIcons.map((icon) => (
							<li
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									marginRight: "16px",
								}}
								key={icon.name}
							>
								{icon.src && (
									<>
										<img src={icon.src} style={{ width: "50px" }} />
										<p style={{ fontSize: "14px" }}>{icon.name}</p>
									</>
								)}
							</li>
						))}
					</ul>
				)}

				<PanelBody title="Select Front End Skills">
					{FRONT_END_SKILLS &&
						FRONT_END_SKILLS.map((skill) => (
							<>
								<CheckboxControl
									key={skill.name}
									label={skill.name}
									checked={selectedIcons.some(
										(icon) => icon.name === skill.name,
									)}
									onChange={(checked) =>
										onIconChange(
											checked
												? [...selectedIcons, skill]
												: selectedIcons.filter(
														(icon) => icon.name !== skill.name,
												  ),
										)
									}
								/>
							</>
						))}
				</PanelBody>
				<PanelBody title="Select Back End Skills">
					{BACK_END_SKILLS &&
						BACK_END_SKILLS.map((skill) => (
							<CheckboxControl
								label={skill.name}
								checked={selectedIcons.includes(skill.name)}
								onChange={(checked) =>
									onIconChange(
										checked
											? [...selectedIcons, skill.name]
											: selectedIcons.filter((icon) => icon !== skill.name),
									)
								}
							/>
						))}
				</PanelBody>
				<PanelBody title="Select Extra Skills">
					{EXTRA_SKILLS &&
						EXTRA_SKILLS.map((skill) => (
							<CheckboxControl
								label={skill.name}
								checked={selectedIcons.includes(skill.name)}
								onChange={(checked) =>
									onIconChange(
										checked
											? [...selectedIcons, skill.name]
											: selectedIcons.filter((icon) => icon !== skill.name),
									)
								}
							/>
						))}
				</PanelBody>
			</div>
		</>
	);
}
