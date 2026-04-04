export interface ReportedItem {
  id: string;
  itemId: string;
  title: string;
  creator: string;
  reason: string;
  reports: number;
  status: string;
  thumbnailUrl?: string; // We'll just generate gradient backgrounds based on title
}

export const reportedItemsData: ReportedItem[] = [
  {
    id: 'm1',
    itemId: '9283-X',
    title: 'Urban Geometry #1',
    creator: 'Julian Darko',
    reason: 'COPYRIGHT',
    reports: 42,
    status: 'Pending',
  },
  {
    id: 'm2',
    itemId: '9395-A',
    title: 'Cosmic Patterns #3',
    creator: 'Isabella Klein',
    reason: 'COPYRIGHT',
    reports: 50,
    status: 'Pending',
  },
  {
    id: 'm3',
    itemId: '9285-Z',
    title: 'Digital Dreams #2',
    creator: 'Max Holloway',
    reason: 'COPYRIGHT',
    reports: 28,
    status: 'Under Review',
  },
  {
    id: 'm4',
    itemId: '9284-Y',
    title: "Nature's Embrace #7",
    creator: 'Sofia Lennon',
    reason: 'COPYRIGHT',
    reports: 35,
    status: 'Approved',
  },
  {
    id: 'm5',
    itemId: '9344-C',
    title: 'Vintage Touch #5',
    creator: 'Emma Watson',
    reason: 'COPYRIGHT',
    reports: 45,
    status: 'Under Review',
  },
  {
    id: 'm6',
    itemId: '9289-D',
    title: 'Tech Fusion #8',
    creator: 'Oliver Smith',
    reason: 'COPYRIGHT',
    reports: 38,
    status: 'Pending',
  },
  {
    id: 'm7',
    itemId: '9287-B',
    title: 'Abstract Vibes #1',
    creator: 'Lucas Thompson',
    reason: 'COPYRIGHT',
    reports: 30,
    status: 'Approved',
  },
];

export interface ModerationPreviewData {
  title: string;
  uploadedAt: string;
  fileSize: string;
  fileType: string;
  creatorName: string;
  creatorTier: string;
  trustScore: string;
  trustScoreValue: number; // For progress bar/color
  priorViolations: number;
  accountStatus: string;
  systemRecommendation: string;
}

export const previewData: ModerationPreviewData = {
  title: 'Urban Geometry #4',
  uploadedAt: 'Oct 24, 2023',
  fileSize: '4.2MB',
  fileType: 'JPG',
  creatorName: 'Julian Darko',
  creatorTier: 'Creator Tier 3',
  trustScore: 'Low (12%)',
  trustScoreValue: 12,
  priorViolations: 4,
  accountStatus: 'Under Review',
  systemRecommendation: "AI detected 94% visual match with copyrighted material from 'Getty Assets'. Recommend immediate removal.",
};
