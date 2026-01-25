import { features } from '../data/index.tsx';
import FeatureCard from './FeatureCard.tsx';
const FeaturesSection = () => {
    
  return (
      <div className="flex gap-10 mx-auto px-3 py-10 justify-center">
          {features.map((feature, index) => (
              <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
              >
                  {feature.icon}
              </FeatureCard>
          ))}
      </div>
  );
}

export default FeaturesSection;