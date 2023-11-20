import {defineStore} from "pinia";
import { v4 as uuid } from 'uuid';

type Notification = {
    id?: string,
    type: 'success' | 'warning' | 'danger'
    icon: string,
    title: string,
    message?: string,
}

export const useNotificationStore = defineStore('notificationStore', {
    state: () => ({
        notifications: [] as Notification[]
    }),
    actions: {
        createNotification({type, icon, title, message}: Notification) {
            const id = uuid()
            this.notifications.push(
                {
                    id: id,
                    type: type,
                    icon: icon,
                    title: title,
                    message: message
                }
            )

            this.updateState(id)
        },

        updateState(id: string) {
            setTimeout(() => {
                this.notifications = this.notifications.filter(notification => notification.id !== id)
            }, 3000)
        }
    }
})