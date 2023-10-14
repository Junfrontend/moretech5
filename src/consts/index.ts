export const BusyBranchColor = {
  Empty: '#fadede',
  SemiFull: '#f09796',
  Full: '#811111',
};

export const busyBranchColors = Object.values(BusyBranchColor);

export const BranchBusyLabel = {
  Full: 'Высокая',
  SemiFull: 'Средняя',
  Empty: 'Низкая'
};

export const BranchBusyClass = {
  Full: 'red',
  SemiFull: 'semi-red',
  Empty: 'light',
}

export const busyLabels = Object.values(BranchBusyLabel);
export const busyClassNames = Object.values(BranchBusyClass);
