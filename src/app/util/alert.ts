import {FuseConfirmationService} from "../services/confirmation.service";

export const openConfirmationDialog = function (
  parameters: {
    fuseConfirmationService: FuseConfirmationService,
    action: () => void,
    title?: string,
    message?: string,
    label?: string,
    labelCancel?: string,
    icon?: any,
  }
) {
  if (!parameters.message) parameters.message = `¿Está seguro de eliminar este registro?`;
  if (!parameters.title) parameters.title = `Eliminar`;
  if (!parameters.label) parameters.label = `Eliminar`;

  // Open the confirmation dialog
  const confirmation = parameters.fuseConfirmationService.open({
    title: parameters.title,
    message: parameters.message,
    actions: {
      confirm: {
        label: parameters.label,
      },
      cancel: {
        label: parameters.labelCancel,
      }
    },
    icon: parameters.icon,
  });
  // Subscribe to the confirmation dialog closed action
  confirmation.afterClosed().subscribe((result: string) => {
    // If the confirm button pressed...
    if (result === 'confirmed') {
      parameters.action();
    }
  });
}
