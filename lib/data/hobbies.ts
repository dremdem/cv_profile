export interface Hobby {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const hobbies: Hobby[] = [
  {
    id: "hobby-1",
    name: "Motocross",
    description: "Dirt biking and off-road adventures",
    icon: "🏍️"
  },
  {
    id: "hobby-2",
    name: "Sailing",
    description: "Exploring the waters under sail",
    icon: "⛵"
  },
  {
    id: "hobby-3",
    name: "Windsurfing",
    description: "Riding wind and waves",
    icon: "🏄"
  },
  {
    id: "hobby-4",
    name: "Snorkeling",
    description: "Underwater exploration",
    icon: "🤿"
  },
  {
    id: "hobby-5",
    name: "Roller Skating",
    description: "Rolling through the streets",
    icon: "🛼"
  },
  {
    id: "hobby-6",
    name: "Table Tennis",
    description: "Fast-paced ping pong matches",
    icon: "🏓"
  },
  {
    id: "hobby-7",
    name: "Drums",
    description: "Making rhythm and beats",
    icon: "🥁"
  }
];
