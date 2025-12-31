import { RiCloseCircleLine } from "react-icons/ri";

type SideCardProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const SideCard = ({ isOpen, onClose, children }: SideCardProps) => {
  if (!isOpen) return null

  return (
    <aside className="sidecard">
      <div className="sidecard-inner">
        <div className="sidecard-header">
          <div onClick={onClose} style={{ cursor: 'pointer' }}>
            <RiCloseCircleLine size={26} />
          </div>
        </div>

        <div className="sidecard-content">
          {children}
        </div>
      </div>
    </aside>
  )
}
