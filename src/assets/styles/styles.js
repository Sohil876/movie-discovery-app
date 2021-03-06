const coolGray = {
	[900]: '#111827',
	[800]: '#1F2937',
	[700]: '#374151',
	[600]: '#4B5563',
	[500]: '#6B7280',
	[400]: '#9CA3AF',
	[300]: '#D1D5DB',
	[200]: '#E5E7EB',
	[100]: '#F3F4F6',
	[50]: '#F9FAFB',
};

const gray = {
	// --clr-red: '#e60a15',
	[1000]: 'hsl(252, 5%, 5%)',
	[900]: '#151419',
	[800]: ' #1e1d22',
	[700]: '#292830',
	[600]: ' #6f6e77',
	[500]: ' hsl(248, 4%, 55%)',
};

const blue = {
	[900]: '#1E3A8A',
	[800]: '#1E40AF',
	[700]: '#1D4ED8',
	[600]: '#2563EB',
	[500]: '#3B82F6',
	[400]: '#60A5FA',
	[300]: '#93C5FD',
	[200]: '#BFDBFE',
	[100]: '#DBEAFE',
	[50]: '#EFF6FF',
};

export const colors = {
	// primaryBg: '#0e0b20',
	primaryBg: `${gray[900]}`,
	navbar: `${gray[1000]}`,
	offWhite: `${coolGray[400]}`,
	primaryClr: '#f35600',
	yellow: '#ffb70c',

	coolGray900: `${coolGray[900]}`,
	coolGray700: `${coolGray[700]}`,
	coolGray600: `${coolGray[600]}`,
	coolGray500: `${coolGray[500]}`,
	coolGray400: `${coolGray[400]}`,
	coolGray500: `${coolGray[500]}`,
	coolGray300: `${coolGray[300]}`,
	coolGray200: `${coolGray[200]}`,
	coolGray100: `${coolGray[100]}`,
	coolGray50: `${coolGray[50]}`,

	gray1000: `${gray[1000]}`,
	gray900: `${gray[900]}`,
	gray800: `${gray[700]}`,
	gray700: `${gray[800]}`,
	gray600: `${gray[600]}`,
	gray500: `${gray[500]}`,
};

export const constants = {
	borderRadiusSm: '5px',
	borderRadiusLg: '10px',
	horizontalPadding: '20px',
	hitSlop: { top: 10, bottom: 10, left: 10, right: 10 },
};
