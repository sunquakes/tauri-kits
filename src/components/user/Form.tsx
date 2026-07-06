import { useEffect } from 'react'
import { Drawer, Form, Input, Button, Space, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { add, edit } from '../../api/user'

interface UserFormProps {
  title: string
  open: boolean
  user: { id?: number; username: string; nickname: string; password?: string } | null
  onClose: () => void
  onRefreshList: () => void
}

interface FormValues {
  id?: number
  username: string
  nickname: string
  password: string
}

export default function UserForm({ title, open, user, onClose, onRefreshList }: UserFormProps) {
  const { t } = useTranslation()
  const [form] = Form.useForm<FormValues>()

  useEffect(() => {
    if (open) {
      if (user) {
        form.setFieldsValue({ ...user, password: '' })
      } else {
        form.resetFields()
      }
    }
  }, [open, user, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      if (user?.id) {
        await edit(user.id, values)
        message.success(t('message.edit.success'))
      } else {
        await add(values)
        message.success(t('message.add.success'))
      }
      onClose()
      onRefreshList()
    } catch (e) {
      console.error(e)
      if (user?.id) {
        message.error(t('message.edit.fail'))
      } else {
        message.error(t('message.add.fail'))
      }
    }
  }

  return (
    <Drawer title={title} open={open} onClose={onClose}>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item name="username" label={t('user.username')} rules={[{ required: true, message: t('form.required', { field: t('user.username') }) }]}>
          <Input disabled={!!user?.id} placeholder={t('placeholder.input_username')} />
        </Form.Item>
        <Form.Item name="nickname" label={t('user.nickname')} rules={[{ required: true, message: t('form.required', { field: t('user.nickname') }) }]}>
          <Input placeholder={t('placeholder.input_nickname')} />
        </Form.Item>
        <Form.Item
          name="password"
          label={t('user.password')}
          rules={[{ required: !user?.id, message: t('form.required', { field: t('user.password') }) }]}
        >
          <Input.Password placeholder={t('user.password')} />
        </Form.Item>
      </Form>
      <Space style={{ marginTop: 16 }}>
        <Button onClick={onClose}>{t('action.cancel')}</Button>
        <Button type="primary" onClick={handleSubmit}>{t('action.submit')}</Button>
      </Space>
    </Drawer>
  )
}
