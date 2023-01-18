export interface BuddyBuilderType {
    useCaseType: "input" | "code snippet";
    value: string;
    label: string;
    id: string;
    children: BuddyBuilderType[] | [];
    description?: string;
    chatbotID?: string;
    linkToDocs?: string;
  }