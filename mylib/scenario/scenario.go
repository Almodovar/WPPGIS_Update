package scenario

type Scenario struct {
	Id          int
	Name        string
	Description string
	CreatedAt   string
	ClientName  string
	Status      string
}

type ScenarioByClient struct {
	ClientName string
	Scenarios  []*Scenario
}
