import { Heading, HoverCard, IconButton } from "@radix-ui/themes";

const Status: React.FC<{type: string, message: string}> = ({type, message}) => {
  return (
    <HoverCard.Root>
    <HoverCard.Trigger>
      <IconButton className={"!rounded-full !b-(1 solid stone-3) !cursor-default shadow-inner " + (type === "info" ? "!bg-white" : "!bg-peach")}>
        <i className={" " + (type === "info" ? " i-mdi-check text-stone-7" : " i-mdi-alert text-black")} />
      </IconButton>
    </HoverCard.Trigger>
    <HoverCard.Content className={"shadow-md !py-2 " + (type === "info" ? " text-stone-7" : " !bg-peach text-white")}>
      <Heading size="2" as="h3" className="font-(!sans !semibold) color-stone-600" >
        {message}
      </Heading>
    </HoverCard.Content>
  </HoverCard.Root>
  );
}
export default Status