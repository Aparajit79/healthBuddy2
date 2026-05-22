
// Health Tips Service for providing health-related tips and information

type HealthTip = {
  id: number;
  category: string;
  title: string;
  content: string;
};

class HealthTipsService {
  private tips: HealthTip[] = [
    {
      id: 1,
      category: "nutrition",
      title: "Stay Hydrated",
      content: "Drink at least 8 glasses of water daily to maintain proper hydration and support bodily functions."
    },
    {
      id: 2,
      category: "fitness",
      title: "Regular Exercise",
      content: "Aim for at least 30 minutes of moderate exercise 5 days a week to improve cardiovascular health."
    },
    {
      id: 3,
      category: "sleep",
      title: "Sleep Quality",
      content: "Maintain a consistent sleep schedule, targeting 7-8 hours of quality sleep each night."
    },
    {
      id: 4,
      category: "mental",
      title: "Mindfulness Practice",
      content: "Incorporate 10 minutes of meditation daily to reduce stress and improve mental clarity."
    },
    {
      id: 5,
      category: "nutrition",
      title: "Balanced Diet",
      content: "Include a variety of colorful fruits and vegetables in your daily meals to ensure adequate nutrient intake."
    }
  ];

  getRandomTip(): HealthTip {
    const randomIndex = Math.floor(Math.random() * this.tips.length);
    return this.tips[randomIndex];
  }

  getTipsByCategory(category: string): HealthTip[] {
    return this.tips.filter(tip => tip.category === category);
  }
}

export const healthTipsService = new HealthTipsService();
