export const PROMPTS = {
  "risk-conclusion": `Analyze the following risk profile and provide a professional conclusion with recommendations:
Historical Data:
- Previous risk assessments: {historyCount} assessments
- Trend: {trend}

Please provide:
1. A concise risk assessment conclusion (2-3 sentences)
2. Key risk indicators to monitor
3. Recommended mitigation strategies
4. Suggested review timeline`,

  "annual-audit-plan": `Generate a strategic annual audit plan based on the following risk assessment:

Total Risks Identified: {totalRisks}
High Priority Risks: {highRiskCount}
Moderate Priority Risks: {moderateRiskCount}
Low Priority Risks: {lowRiskCount}

Risk Categories Breakdown:
{categoryBreakdown}

Please provide:
1. Prioritized audit schedule for the year
2. Resource allocation recommendations
3. Estimated timeline for each audit area
4. Dependencies between audit activities`,

  "audit-charter-summary": `Create a comprehensive audit charter summary for:

Organization: {organization}
Audit Period: {period}
Scope: {scope}

Key Risk Areas:
{riskAreas}

Please provide:
1. Executive summary
2. Audit objectives
3. Authority and responsibility framework
4. Reporting structure`,
} as const;

export type PromptKey = keyof typeof PROMPTS;

export interface PromptVariables {
  [key: string]: string | number | boolean | undefined;
}

export function interpolatePrompt(
  template: string,
  variables: PromptVariables,
): string {
  let result = template;

  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    const replacement = String(value ?? "");
    result = result.replace(new RegExp(placeholder, "g"), replacement);
  });

  return result;
}

export function getPrompt(
  key: PromptKey,
  variables: PromptVariables = {},
): string {
  const template = PROMPTS[key];
  return interpolatePrompt(template, variables);
}
