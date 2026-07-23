import { Card, Row, Col, Typography, Input, Space, Tag, Divider } from 'antd'
import { useState } from 'react'
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  TeamOutlined,
  DashboardOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  MailOutlined,
  PhoneOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  DownloadOutlined,
  UploadOutlined,
  ReloadOutlined,
  ExportOutlined,
  ImportOutlined,
  LockOutlined,
  UnlockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  StarOutlined,
  HeartOutlined,
  LikeOutlined,
  DislikeOutlined,
  MessageOutlined,
  NotificationOutlined,
  BellOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  LinkOutlined,
  QrcodeOutlined,
  ShareAltOutlined,
  PrinterOutlined,
  CameraOutlined,
  VideoCameraOutlined,
  PictureOutlined,
  FileOutlined,
  FolderOutlined,
  CloudOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  DesktopOutlined,
  TabletOutlined,
  MobileOutlined,
  WifiOutlined,
  ApiOutlined,
  DatabaseOutlined,
  CodeOutlined,
  BugOutlined,
  SafetyOutlined,
  KeyOutlined,
  IdcardOutlined,
  CreditCardOutlined,
  WalletOutlined,
  BankOutlined,
  PayCircleOutlined,
  GiftOutlined,
  TrophyOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  FireOutlined,
  BulbOutlined,
  ExperimentOutlined,
  ToolOutlined,
  BuildOutlined,
  ConsoleSqlOutlined,
  HighlightOutlined,
  BgColorsOutlined,
  FormatPainterOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './Icon.scss'

const { Title, Text } = Typography

const iconGroups = [
  {
    title: 'Navigation',
    icons: [
      { name: 'HomeOutlined', component: HomeOutlined, color: '#1890ff' },
      { name: 'DashboardOutlined', component: DashboardOutlined, color: '#52c41a' },
      { name: 'AppstoreOutlined', component: AppstoreOutlined, color: '#722ed1' },
      { name: 'SettingOutlined', component: SettingOutlined, color: '#fa8c16' }
    ]
  },
  {
    title: 'User & Team',
    icons: [
      { name: 'UserOutlined', component: UserOutlined, color: '#1890ff' },
      { name: 'TeamOutlined', component: TeamOutlined, color: '#52c41a' },
      { name: 'IdcardOutlined', component: IdcardOutlined, color: '#722ed1' }
    ]
  },
  {
    title: 'Charts',
    icons: [
      { name: 'BarChartOutlined', component: BarChartOutlined, color: '#1890ff' },
      { name: 'LineChartOutlined', component: LineChartOutlined, color: '#52c41a' },
      { name: 'PieChartOutlined', component: PieChartOutlined, color: '#722ed1' }
    ]
  },
  {
    title: 'E-commerce',
    icons: [
      { name: 'ShoppingCartOutlined', component: ShoppingCartOutlined, color: '#1890ff' },
      { name: 'GiftOutlined', component: GiftOutlined, color: '#52c41a' },
      { name: 'WalletOutlined', component: WalletOutlined, color: '#722ed1' },
      { name: 'BankOutlined', component: BankOutlined, color: '#fa8c16' },
      { name: 'CreditCardOutlined', component: CreditCardOutlined, color: '#13c2c2' },
      { name: 'PayCircleOutlined', component: PayCircleOutlined, color: '#eb2f96' }
    ]
  },
  {
    title: 'Communication',
    icons: [
      { name: 'MailOutlined', component: MailOutlined, color: '#1890ff' },
      { name: 'PhoneOutlined', component: PhoneOutlined, color: '#52c41a' },
      { name: 'MessageOutlined', component: MessageOutlined, color: '#722ed1' },
      { name: 'NotificationOutlined', component: NotificationOutlined, color: '#fa8c16' },
      { name: 'BellOutlined', component: BellOutlined, color: '#13c2c2' }
    ]
  },
  {
    title: 'Actions',
    icons: [
      { name: 'SearchOutlined', component: SearchOutlined, color: '#1890ff' },
      { name: 'EditOutlined', component: EditOutlined, color: '#52c41a' },
      { name: 'DeleteOutlined', component: DeleteOutlined, color: '#ff4d4f' },
      { name: 'PlusOutlined', component: PlusOutlined, color: '#722ed1' },
      { name: 'DownloadOutlined', component: DownloadOutlined, color: '#fa8c16' },
      { name: 'UploadOutlined', component: UploadOutlined, color: '#13c2c2' },
      { name: 'ReloadOutlined', component: ReloadOutlined, color: '#eb2f96' },
      { name: 'ExportOutlined', component: ExportOutlined, color: '#1890ff' },
      { name: 'ImportOutlined', component: ImportOutlined, color: '#52c41a' }
    ]
  },
  {
    title: 'Security',
    icons: [
      { name: 'LockOutlined', component: LockOutlined, color: '#1890ff' },
      { name: 'UnlockOutlined', component: UnlockOutlined, color: '#52c41a' },
      { name: 'SafetyOutlined', component: SafetyOutlined, color: '#722ed1' },
      { name: 'KeyOutlined', component: KeyOutlined, color: '#fa8c16' }
    ]
  },
  {
    title: 'Feedback',
    icons: [
      { name: 'StarOutlined', component: StarOutlined, color: '#faad14' },
      { name: 'HeartOutlined', component: HeartOutlined, color: '#eb2f96' },
      { name: 'LikeOutlined', component: LikeOutlined, color: '#52c41a' },
      { name: 'DislikeOutlined', component: DislikeOutlined, color: '#ff4d4f' }
    ]
  },
  {
    title: 'Time & Location',
    icons: [
      { name: 'CalendarOutlined', component: CalendarOutlined, color: '#1890ff' },
      { name: 'ClockCircleOutlined', component: ClockCircleOutlined, color: '#52c41a' },
      { name: 'EnvironmentOutlined', component: EnvironmentOutlined, color: '#722ed1' },
      { name: 'GlobalOutlined', component: GlobalOutlined, color: '#fa8c16' }
    ]
  },
  {
    title: 'Media',
    icons: [
      { name: 'CameraOutlined', component: CameraOutlined, color: '#1890ff' },
      { name: 'VideoCameraOutlined', component: VideoCameraOutlined, color: '#52c41a' },
      { name: 'PictureOutlined', component: PictureOutlined, color: '#722ed1' },
      { name: 'PrinterOutlined', component: PrinterOutlined, color: '#fa8c16' }
    ]
  },
  {
    title: 'Files & Cloud',
    icons: [
      { name: 'FileOutlined', component: FileOutlined, color: '#1890ff' },
      { name: 'FolderOutlined', component: FolderOutlined, color: '#52c41a' },
      { name: 'CloudOutlined', component: CloudOutlined, color: '#722ed1' },
      { name: 'CloudUploadOutlined', component: CloudUploadOutlined, color: '#fa8c16' },
      { name: 'CloudDownloadOutlined', component: CloudDownloadOutlined, color: '#13c2c2' }
    ]
  },
  {
    title: 'Devices',
    icons: [
      { name: 'DesktopOutlined', component: DesktopOutlined, color: '#1890ff' },
      { name: 'TabletOutlined', component: TabletOutlined, color: '#52c41a' },
      { name: 'MobileOutlined', component: MobileOutlined, color: '#722ed1' },
      { name: 'WifiOutlined', component: WifiOutlined, color: '#fa8c16' }
    ]
  },
  {
    title: 'Development',
    icons: [
      { name: 'ApiOutlined', component: ApiOutlined, color: '#1890ff' },
      { name: 'DatabaseOutlined', component: DatabaseOutlined, color: '#52c41a' },
      { name: 'CodeOutlined', component: CodeOutlined, color: '#722ed1' },
      { name: 'BugOutlined', component: BugOutlined, color: '#ff4d4f' },
      { name: 'ConsoleSqlOutlined', component: ConsoleSqlOutlined, color: '#fa8c16' }
    ]
  },
  {
    title: 'Creative',
    icons: [
      { name: 'HighlightOutlined', component: HighlightOutlined, color: '#1890ff' },
      { name: 'BgColorsOutlined', component: BgColorsOutlined, color: '#52c41a' },
      { name: 'FormatPainterOutlined', component: FormatPainterOutlined, color: '#722ed1' },
      { name: 'ExperimentOutlined', component: ExperimentOutlined, color: '#fa8c16' }
    ]
  },
  {
    title: 'Achievement',
    icons: [
      { name: 'TrophyOutlined', component: TrophyOutlined, color: '#faad14' },
      { name: 'RocketOutlined', component: RocketOutlined, color: '#1890ff' },
      { name: 'ThunderboltOutlined', component: ThunderboltOutlined, color: '#722ed1' },
      { name: 'FireOutlined', component: FireOutlined, color: '#ff4d4f' },
      { name: 'BulbOutlined', component: BulbOutlined, color: '#fa8c16' }
    ]
  },
  {
    title: 'Tools',
    icons: [
      { name: 'ToolOutlined', component: ToolOutlined, color: '#1890ff' },
      { name: 'BuildOutlined', component: BuildOutlined, color: '#52c41a' },
      { name: 'QrcodeOutlined', component: QrcodeOutlined, color: '#722ed1' },
      { name: 'ShareAltOutlined', component: ShareAltOutlined, color: '#fa8c16' },
      { name: 'LinkOutlined', component: LinkOutlined, color: '#13c2c2' }
    ]
  },
  {
    title: 'Visibility',
    icons: [
      { name: 'EyeOutlined', component: EyeOutlined, color: '#1890ff' },
      { name: 'EyeInvisibleOutlined', component: EyeInvisibleOutlined, color: '#ff4d4f' }
    ]
  }
]

export default function IconDemo() {
  const { t } = useTranslation()
  const [searchText, setSearchText] = useState('')

  const filteredGroups = iconGroups.map(group => ({
    ...group,
    icons: group.icons.filter(icon =>
      icon.name.toLowerCase().includes(searchText.toLowerCase())
    )
  })).filter(group => group.icons.length > 0)

  const totalIcons = iconGroups.reduce((sum, group) => sum + group.icons.length, 0)

  return (
    <div className="icon-demo">
      <div className="page-header">
        <Title level={3}>{t('icon.title')}</Title>
        <Text type="secondary">{t('icon.description', { count: totalIcons })}</Text>
      </div>

      <Card className="search-card">
        <Space size="large">
          <Input
            placeholder={t('icon.search_placeholder')}
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
          <Tag color="blue">{t('icon.total', { count: totalIcons })}</Tag>
          {searchText && (
            <Tag color="green">{t('icon.filtered', { count: filteredGroups.reduce((sum, g) => sum + g.icons.length, 0) })}</Tag>
          )}
        </Space>
      </Card>

      {filteredGroups.map((group, groupIndex) => (
        <Card
          key={groupIndex}
          className="icon-group-card"
          title={
            <Space>
              <Text strong>{group.title}</Text>
              <Tag>{group.icons.length}</Tag>
            </Space>
          }
        >
          <Row gutter={[16, 16]}>
            {group.icons.map((icon, iconIndex) => (
              <Col key={iconIndex} xs={12} sm={8} md={6} lg={4} xl={3}>
                <div className="icon-item">
                  <div className="icon-wrapper" style={{ color: icon.color }}>
                    <icon.component style={{ fontSize: '32px' }} />
                  </div>
                  <Text className="icon-name">{icon.name}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      ))}

      {filteredGroups.length === 0 && searchText && (
        <Card className="empty-card">
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <SearchOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
            <Divider />
            <Text type="secondary">{t('icon.no_results', { keyword: searchText })}</Text>
          </div>
        </Card>
      )}
    </div>
  )
}