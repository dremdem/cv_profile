export interface Hobby {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const hobbies: Hobby[] = [
  {
    id: "hobby-1",
    name: "Retro Gaming",
    description: "Classic arcade games and 8-bit nostalgia",
    icon: "🎮"
  },
  {
    id: "hobby-2",
    name: "Open Source",
    description: "Contributing to community projects",
    icon: "💻"
  },
  {
    id: "hobby-3",
    name: "Sci-Fi Reading",
    description: "Exploring futuristic worlds and concepts",
    icon: "📚"
  },
  {
    id: "hobby-4",
    name: "Tech Tinkering",
    description: "Experimenting with new technologies",
    icon: "🔧"
  }
];
