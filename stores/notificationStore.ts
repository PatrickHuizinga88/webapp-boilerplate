import {defineStore} from "pinia";
import {v4 as uuid} from 'uuid';
import {useT} from "~/composable/useT";

type Notification = {
  id?: string,
  type: 'success' | 'destructive',
  title: string
  description?: string
}

type NotificationProps =
  | { type: 'success' | 'destructive', isError: true }
  | { type: 'success' | 'destructive', isError?: false, action: 'save' | 'update' | 'delete' | 'retrieve', item: string }

export const useNotificationStore = defineStore('notificationStore', {
  state: () => ({
    notifications: [] as Notification[]
  }),
  actions: {
    createNotification(props: NotificationProps) {
      const {type, isError} = props
      const id = uuid()

      const getNotificationText = (text: 'title' | 'description') => {
        const actionContent = {
          error: `common.notifications.error.${text}`,
          save: {
            success: `common.notifications.save.success.${text}`,
            destructive: `common.notifications.save.error.${text}`
          },
          update: {
            success: `common.notifications.update.success.${text}`,
            destructive: `common.notifications.update.error.${text}`
          },
          delete: {
            success: `common.notifications.delete.success.${text}`,
            destructive: `common.notifications.delete.error.${text}`
          },
          retrieve: {
            success: `common.notifications.retrieve.success.${text}`,
            destructive: `common.notifications.retrieve.error.${text}`
          },
        }

        if (isError) {
          return useT(actionContent.error);
        }

        const { action, item } = props;
        return useT(actionContent[action][type], {item: lowercase(item)});
      }

      this.notifications.push(
        {
          id,
          type,
          title: capitalizeSentence(getNotificationText('title')),
          description: capitalizeSentence(getNotificationText('description'))
        }
      )

      this.updateState(id)
    },

    updateState(id: string) {
      setTimeout(() => {
        this.notifications = this.notifications.filter(notification => notification.id !== id)
      }, 4000)
    }
  }
})