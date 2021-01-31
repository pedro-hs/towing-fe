import React from 'react';
import AccessDenied from 'shared/components/accessDenied/index';
import { hasRoles } from 'shared/functions/security';

const PermissionHandler = (props) => {
  return hasRoles(props.roles) ? props.children : <AccessDenied />;
};

export default PermissionHandler;
