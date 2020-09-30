import { Box, Spacer } from 'ink';
import React from 'react';
import getSafePackageName from '../core/get-safe-package-name';

// Hooks
import { LoadableEvent, useLoadableRace } from '../utils/hooks/useLoadableEvent';

// Components
import SuperDiagnosticMessage from '../utils/SuperDiagnosticMessage';
import InstallDependencies from './InstallDependencies';
import InstallDevDependencies from './InstallDevDependencies';

export interface ManageDependenciesProps extends LoadableEvent<void, undefined> {
  template: string;
  packageName?: string;
}

const MAX_SUCCESS = 2;

export default function ManageDependencies(
  { template, packageName, ...props }: ManageDependenciesProps,
): JSX.Element {
  const directory = packageName
    ? getSafePackageName(packageName)
    : '.';

  const {
    status,
    onSuccess,
    onFailure,
  } = useLoadableRace(props, MAX_SUCCESS, [template, directory]);

  return (
    <Box flexDirection="column">
      <SuperDiagnosticMessage
        status={status}
        pending="Managing dependencies..."
        success="Managed dependencies."
      />
      <Spacer />
      <Box flexDirection="column" marginLeft={2}>
        <InstallDependencies
          template={template}
          directory={directory}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
        <Spacer />
        <InstallDevDependencies
          template={template}
          directory={directory}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </Box>
    </Box>
  );
}