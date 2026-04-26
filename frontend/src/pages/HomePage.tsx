import { useNavigate } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { PageShell } from '../components/common/PageShell'
import { OrdersTable } from '../components/home/OrdersTable'
import { useAppSelector } from '../hooks/storeHooks'

export function HomePage() {
  const navigate = useNavigate()
  const orders = useAppSelector((state) => state.orders.orders)
  const rows = 8

  return (
    <PageShell
      title="Home"
      action={
        <Button type="button" onClick={() => navigate('/sales-order/new')}>
          Add New
        </Button>
      }
    >
      <div className="border border-slate-600 bg-white p-2">
        <OrdersTable
          orders={orders}
          rows={rows}
          onRowDoubleClick={(orderId) => navigate(`/sales-order/${orderId}`)}
          showData
        />
      </div>
    </PageShell>
  )
}
