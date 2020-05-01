const removeProp = (x, prop) => {
    delete x[prop]
    return x
  }
  
  it('remove prop', () => {
    expect(removeProp({a: 1, b: 2}, 'a')).toEqual({b: 2})
  })
  const assignSeverity = (alert, rules) => {
    const rulesMatcher = countMatchingProps(alert, rules)
    return {
      ...alert,
      severity:
        // idea: find rule that has all matching props
        // if none found remove a prop in order of priority, method, route, service, alert_type
        // separate default and custom?
        // three tiers of custom rules
        // 1. rule specificity is 3 and intersectionCount is 3 and
        // 2. rule specificity is 3
        (
          // console.log(rulesMatcher) ||
          
          rulesMatcher.find(r => r.editable && r.intersections === r.ruleCount && r.keys.every(x => r[x] === alert[x])) ||
          rulesMatcher.find(
            r => r.editable && r.intersections === r.ruleCount - 1 && r.keys.every(x => r[x] === alert[x])
          ) ||
          rulesMatcher.find(
            r => r.editable && r.intersections === r.ruleCount - 2 && r.keys.every(x => r[x] === alert[x])
          ) ||
          rulesMatcher.find(r => r.intersections === 1 && r.keys.every(x => r[x] === alert[x]))
        ).severity,
    }
  }
  
  const countMatchingProps = (alert, rules) => {
    return rules.map(r => ({
      ...r,
      intersections: Object.keys(r).filter(k => k in alert).length,
      ruleCount: Object.keys(r).length,
      keys: Object.keys(r).filter(k => k in alert),
    }))
  }
  it('countMatchingProps prop', () => {
    expect(countMatchingProps({a: 1, b: 2}, [{a: 1, b: 2}])[0].intersections).toEqual(2)
    expect(countMatchingProps({a: 1, b: 2}, [{a: 1, b: 2}])[0].intersections).toEqual(2)
  })
  const defaultRules = [{alert_type: 'value_type', severity: 'low'}, {alert_type: 'traffic', severity: 'medium'}]
  describe('assign severity', () => {
    describe('Given an service rule with method and no alert_type', () => {
      const custom = [...defaultRules, {severity: 'high', serviceId: 'x', method: 'get', editable: true}]
  
      it('should return high with method and service', () => {
        expect(assignSeverity({alert_type: 'traffic', serviceId: 'x', method: 'get'}, custom).severity).toEqual('high')
      })
      it('should return medium without method', () => {
        expect(assignSeverity({alert_type: 'traffic', serviceId: 'x'}, custom).severity).toEqual('medium')
      })
      it('should return medium without service', () => {
        expect(assignSeverity({alert_type: 'traffic', method: 'get'}, custom).severity).toEqual('medium')
      })
      it('should return medium without either', () => {
        expect(assignSeverity({alert_type: 'traffic'}, custom).severity).toEqual('medium')
      })
    })
    describe('Given an service rule with method', () => {
      const custom = [
        ...defaultRules,
        {alert_type: 'traffic', severity: 'high', serviceId: 'x', method: 'get', editable: true},
      ]
  
      it('should return high with method and service', () => {
        expect(assignSeverity({alert_type: 'traffic', serviceId: 'x', method: 'get'}, custom).severity).toEqual('high')
      })
      it('should return medium without method', () => {
        expect(assignSeverity({alert_type: 'traffic', serviceId: 'x'}, custom).severity).toEqual('medium')
      })
      it('should return medium without service', () => {
        expect(assignSeverity({alert_type: 'traffic', method: 'get'}, custom).severity).toEqual('medium')
      })
      it('should return medium without either', () => {
        expect(assignSeverity({alert_type: 'traffic'}, custom).severity).toEqual('medium')
      })
    })
    describe('Given a workspace rule with method', () => {
      const custom = [...defaultRules, {alert_type: 'traffic', severity: 'high', method: 'get', editable: true}]
  
      it('should return high with method', () => {
        expect(assignSeverity({alert_type: 'traffic', method: 'get'}, custom).severity).toEqual('high')
      })
      it('should return medium without method', () => {
        expect(assignSeverity({alert_type: 'traffic'}, custom).severity).toEqual('medium')
      })
    })
    describe('Given an service rule', () => {
      const custom = [...defaultRules, {alert_type: 'traffic', severity: 'high', serviceId: 'x', editable: true}]
  
      it('should return high with serviceId', () => {
        expect(assignSeverity({alert_type: 'traffic', serviceId: 'x'}, custom).severity).toEqual('high')
      })
      it('should return medium without serviceId', () => {
        expect(assignSeverity({alert_type: 'traffic'}, custom).severity).toEqual('medium')
      })
    })
    describe('Given an ignore rule', () => {
      const custom = [...defaultRules, {alert_type: 'traffic', severity: 'ignored', editable: true}]
  
      it('should ignore a rule', () => {
        expect(assignSeverity({alert_type: 'traffic'}, custom).severity).toEqual('ignored')
      })
    })
    describe('Given a set of default rules', () => {
      describe('And there is one low alert', () => {
        it('should return low', () => {
          expect(assignSeverity({alert_type: 'value_type'}, defaultRules).severity).toEqual('low')
        })
      })
      describe('And there is one medium alert', () => {
        it('should return medium', () => {
          expect(assignSeverity({alert_type: 'traffic'}, defaultRules).severity).toEqual('medium')
        })
      })
    })
  })
  