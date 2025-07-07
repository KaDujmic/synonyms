import { Card } from "../../../components/Card"
import { LoadingSkeleton } from "../../../components/LoadingSkeleton"

export const SynonymCardLoader = () => {
	return (
		<Card className="synonym-card-loader">
			<LoadingSkeleton width="60%" height="40px" variant="gray" className="synonym-card-loader__title" />
			<hr className="synonym-card-loader__divider" />
			<LoadingSkeleton width="30%" height="24px" variant="gray" className="synonym-card-loader__subtitle" />
			<div className="synonym-card-loader__synonyms">
				<LoadingSkeleton width="80px" height="32px" variant="gray" />
				<LoadingSkeleton width="100px" height="32px" variant="gray" />
				<LoadingSkeleton width="90px" height="32px" variant="gray" />
				<LoadingSkeleton width="70px" height="32px" variant="gray" />
				<LoadingSkeleton width="110px" height="32px" variant="gray" />
			</div>
		</Card>
	)
}