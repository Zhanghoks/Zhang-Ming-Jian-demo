export const SITE = {
  packageName: 'squrvebridge-paper-website',
  browserTitle: 'SqurveBridge · Paper Website',
  title:
    'SqurveBridge: A Harness-Centered Platform for Cross-Domain Text-to-SQL Evaluation and Metric-Guided Loop Engineering',
  authors: ['Mingjian Zhang', 'Zihan Chen', 'Zhe Li', 'Peiyu Liu'],
  affiliation: 'University of International Business and Economics',
  sections: ['Demo Video', 'Abstract'],
  footer: 'SqurveBridge · Research Project Website',
}

export const PROJECT_LINKS = {
  github: {
    href: 'https://github.com/Zhanghoks/SqurveBridge',
    label: 'GitHub',
    icon: 'github',
  },
  huggingFace: {
    href: 'https://huggingface.co/spaces/zmmjjkk/SqurveBridge',
    label: 'Hugging Face Live Demo',
    iconAsset: '/huggingface-logo.svg',
  },
}

export const ABSTRACT =
  'Text-to-SQL research has produced many effective methods, but these methods often remain confined to the benchmarks or domains for which they were designed. Applying them to real-world databases still requires substantial last-mile engineering, including domain-specific adaptation, benchmark normalization, execution setup, and further performance improvement in target scenarios. To close this gap, we present SqurveBridge, a cross-domain Text-to-SQL evaluation and development platform for integrating, diagnosing, and improving existing methods. SqurveBridge converts released methods into modular workflows and standardizes databases, schemas, data splits, execution environments, and evaluation protocols under a common runtime, enabling reproduction, cross-domain testing, and fair comparison. It also records diagnostic evidence beyond final accuracy and uses that evidence to guide bounded, reviewable target-domain updates. SqurveBridge is not a new Text-to-SQL model, but a practical platform for integration, evaluation, diagnosis, and domain-specific improvement.'
