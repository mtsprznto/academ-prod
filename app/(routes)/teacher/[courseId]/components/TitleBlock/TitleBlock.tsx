import { TitleBlockProps } from "./TitleBlock.types";

export function TitleBlock(props: TitleBlockProps) {
  const { title, icon: Icon } = props;
  return (
    <div className="flex items-center mb-6 gap-1">
      <div className="p-2 rounded-full bg-violet-400">
        <Icon className="h-5 w-5 text-white"></Icon>
      </div>
      <h3 className="md:text-xl font-semibold text-sm">{title}</h3>
    </div>
  );
}
