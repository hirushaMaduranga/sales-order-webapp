import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { PageShell } from '../components/PageShell'
import { TableGrid } from '../components/TableGrid'

const headers = ['Col 1', 'Col 2', 'Col 3', 'Col 4', 'Col 5', 'Col 6', 'Col 7']

export function HomePage() {
  const navigate = useNavigate()

  return (
    <PageShell
      title="Home"
      action={
        <Button type="button" onClick={() => navigate('/sales-order')}>
          Add New
        </Button>
      }
    >
      <div className="border-2 border-slate-700 bg-white p-3">
        <TableGrid headers={headers} rows={8} />
      </div>
    </PageShell>
  )
}
