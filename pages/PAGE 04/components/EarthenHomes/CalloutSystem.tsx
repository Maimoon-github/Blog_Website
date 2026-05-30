import React from 'react';
import { CalloutSystemProps } from './types';
import { useCalloutLogic } from './hooks/useFeaturedArticlesGridLogic';
import { StatCallout } from './subcomponents/SkipLink';
import { PrincipleCallout } from './subcomponents/PrincipleCallout';
import { ExampleCallout } from './subcomponents/ExampleCallout';
import { MultiItemCallout } from './subcomponents/Tag';
import { ComparisonCallout } from './subcomponents/CategoryChip';

/**
 * CalloutSystem — unified dispatcher for five distinct callout variants.
 * 
 * Replaces the overloaded "Did You Know?" box (Critical Issue C1).
 * Each variant has a unique visual treatment matched to its communication intent.
 * 
 * Usage: <CalloutSystem data={calloutData} />
 */

export const CalloutSystem: React.FC<<CalloutSystemProps> = ({
  data,
  disableAnimation = false,
  className = '',
}) => {
  const { prefersReducedMotion, isMounted } = useCalloutLogic();
  const shouldReduce = disableAnimation || prefersReducedMotion || !isMounted;

  const wrapperClasses = `my-8 ${className}`;

  switch (data.variant) {
    case 'stat':
      return (
        <div className={wrapperClasses}>
          <StatCallout data={data} prefersReducedMotion={shouldReduce} />
        </div>
      );
    case 'principle':
      return (
        <div className={wrapperClasses}>
          <PrincipleCallout data={data} prefersReducedMotion={shouldReduce} />
        </div>
      );
    case 'example':
      return (
        <div className={wrapperClasses}>
          <ExampleCallout data={data} prefersReducedMotion={shouldReduce} />
        </div>
      );
    case 'multiItem':
      return (
        <div className={wrapperClasses}>
          <MultiItemCallout data={data} prefersReducedMotion={shouldReduce} />
        </div>
      );
    case 'comparison':
      return (
        <div className={wrapperClasses}>
          <ComparisonCallout data={data} prefersReducedMotion={shouldReduce} />
        </div>
      );
    default:
      // Exhaustive check — should never hit if TypeScript strict mode is on
      return null;
  }
};