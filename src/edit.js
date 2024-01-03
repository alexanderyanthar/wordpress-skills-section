import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { RichText } from "@wordpress/block-editor";
import { PanelBody, CheckboxControl } from "@wordpress/components";
import "./editor.scss";
import {
	FRONT_END_SKILLS,
	EXTRA_SKILLS,
	BACK_END_SKILLS,
} from "./constants/skills";
import {
	DndContext,
	useSensor,
	useSensors,
	PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./sortableItem";

export default function Edit({ attributes, setAttributes }) {
	const { skillTitle, selectedIcons } = attributes;

	const onChangeSkillTitle = (newSkillTitle) => {
		setAttributes({ skillTitle: newSkillTitle });
	};

	const onIconChange = (newIcons) => {
		setAttributes({ selectedIcons: newIcons });
	};

	const sensors = useSensors(useSensor(PointerSensor));

	const handleDragEnd = (e) => {
		const { active, over } = e;
		if (active.id !== over.id) {
			const oldIndex = selectedIcons.findIndex((i) => active.id === i.name);
			const newIndex = selectedIcons.findIndex((i) => over.id === i.name);
			setAttributes({
				selectedIcons: arrayMove(selectedIcons, oldIndex, newIndex),
			});
		}
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
					<ul className="wp-block-skills-section-list">
						<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
							<SortableContext items={selectedIcons.map((icon) => icon.name)}>
								{selectedIcons.map((icon, index) => {
									return (
										<SortableItem
											key={icon.name}
											id={icon.name}
											index={index}
											icon={icon}
										/>
									);
								})}
							</SortableContext>
						</DndContext>
					</ul>
				)}

				<PanelBody title={__("Select Front End Skills", "skill-section")}>
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
								key={skill.name}
								label={skill.name}
								checked={selectedIcons.some((icon) => icon.name === skill.name)}
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
						))}
				</PanelBody>
				<PanelBody title="Select Extra Skills">
					{EXTRA_SKILLS &&
						EXTRA_SKILLS.map((skill) => (
							<CheckboxControl
								key={skill.name}
								label={skill.name}
								checked={selectedIcons.some((icon) => icon.name === skill.name)}
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
						))}
				</PanelBody>
			</div>
		</>
	);
}
